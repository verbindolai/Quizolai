import { Question } from '../models/question.model';
import { IQuestion, IInputQuestion } from "../../../wa-quizolai-shared";
import { StatusCodeError } from '../util/exceptions/exceptions';
import {hasPermission} from "../service/auth.service";

const questionDao = {
    async saveQuestion(inputQuestion: IInputQuestion, userID : string): Promise<IQuestion> {
        const nq = new Question(inputQuestion);
        nq.userID = userID;
        return await nq.save();
    },

    async saveQuestions(inputQuestions: IInputQuestion[], userID : string): Promise<IQuestion[]> {
        const questions = inputQuestions.map(inputQuestion => {
           const nq =  new Question(inputQuestion);
           nq.userID = userID;
           return nq;
        });
        return await Question.insertMany(questions);
    },

    async deleteQuestion(id: string, userID : string, permissions : string[]): Promise<IQuestion> {

        let question = await Question.findOne({ _id: id });
        if (!question) {
            throw new StatusCodeError( 'Question not found', 404);
        }
        if (question.userID !== userID && !hasPermission(["edit:question"], permissions)) {
            throw new StatusCodeError(`You don't have permission to delete this question`, 403);
        }
        question = await Question.findOneAndDelete({ _id: id });

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

    async updateQuestion(id: string, inputQuestion: IInputQuestion, userID : string, permissions : string[]): Promise<IQuestion> {
        const question = await Question.findOne({ _id: id });

        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        if (question.userID !== userID && !hasPermission(["edit:question"], permissions)) {
            throw new StatusCodeError(`You don't have permission to edit this question`, 403);
        }

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



