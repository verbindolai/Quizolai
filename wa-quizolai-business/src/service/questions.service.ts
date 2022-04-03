import {IInputQuestion, IQuestion} from "@quizolai-shared/interface/question.interface";
import {InputQuestion, Question} from "../models/question.model";
import * as j2csv from 'json2csv';


const QuestionsService = {

    async getSafeQuestions() {
        return Question.find({ profanity: 0 }, {}, { lean: true });
    },

    async getQuestions(): Promise<IQuestion[]> {
        return Question.find({}, {}, { lean: true });
    },

    async getQuestionsByUser(userID : string): Promise<IQuestion[]> {
        return Question.find({ userID: userID }, {}, { lean: true });
    },


    async createQuestions(inputQuestions: IInputQuestion[], userID : string): Promise<IQuestion[]> {
        const questions = inputQuestions.map(inputQuestion => {
            const nq =  new Question(inputQuestion);
            nq.userID = userID;
            return nq;
        });
        return await Question.insertMany(questions);
    },

    async getRandomQuestions(count: number): Promise<IQuestion[]> {
        return Question.aggregate([
            { $sample: { size: count } }
        ]);
    },
    async getCSV(questions: InputQuestion[]): Promise<string> {
        return await j2csv.parseAsync(questions, {
            fields: [{label: 'Author', value: 'author'}, {label: 'Question', value: 'question'}, {label: 'Answer', value: 'answers.answer'}, {label: "Correct Answer", value: 'answers.correct'}, {label: 'Tags', value: 'tags'},{label: 'Category', value: 'category'}, {label: 'Difficulty', value: 'difficulty'}],
            header: true,
            transforms : [j2csv.transforms.flatten({separator:'_', objects:true}),j2csv.transforms.unwind({paths: ['answers', 'tags'], blankOut: true}) ],
            quote: '"',
            delimiter: ';'
        })
    }
}
export default QuestionsService;