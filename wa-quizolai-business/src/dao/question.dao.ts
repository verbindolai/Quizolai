import { Question } from '../models/question.model';
import { IQuestion, IInputQuestion } from "../../../wa-quizolai-shared";
import { StatusCodeError } from '../util/exceptions/exceptions';

const questionDao = {
    async saveQuestion(inputQuestion: IInputQuestion): Promise<IQuestion> {
        const question = new Question(inputQuestion);
        return await question.save();
    },

    async saveQuestions(inputQuestions: IInputQuestion[]): Promise<IQuestion[]> {
        const questions = inputQuestions.map(inputQuestion => new Question(inputQuestion));
        console.log(questions)
        return await Question.insertMany(questions);
    },

    async deleteQuestion(id: string) {
        const question = await Question.findOneAndDelete({ _id: id });
        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return question;
    },

    async getQuestion(id: string): Promise<IQuestion> {
        const question = await Question.findOne({ _id: id }, {}, { lean: true });
        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return question;
    },

    async updateQuestion(id: string, inputQuestion: IInputQuestion): Promise<IQuestion> {
        const updatedQuestion = await Question.findOneAndUpdate({ _id: id }, inputQuestion, { new: true, upsert: false });
        if (!updatedQuestion) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return updatedQuestion;
    },

    async getSaveQuestions() {
        return Question.find({ profanity: 0 }, {}, { lean: true });
    },

    async getQuestions(): Promise<IQuestion[]> {
        return Question.find({}, {}, { lean: true });
    }
};

export default questionDao;



