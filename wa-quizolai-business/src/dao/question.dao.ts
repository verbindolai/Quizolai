import { IQuestion, Question } from '../models/question.model';

const questionDao = {

    async getQuestion(id: string): Promise<IQuestion | null> {
        return await Question.findOne({ _id: id }, {}, { lean: true });
    },

    async saveQuestion(question: IQuestion): Promise<IQuestion> {
        return await new Question(question).save();
    },

    async deleteQuestion(id: string): Promise<void> {
        await Question.deleteOne({ _id: id });
    }

};

export default questionDao;



