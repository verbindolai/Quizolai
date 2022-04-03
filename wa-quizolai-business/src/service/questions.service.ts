import {IInputQuestion, IQuestion} from "@quizolai-shared/interface/question.interface";
import {Question} from "../models/question.model";

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
}
export default QuestionsService;