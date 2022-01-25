import { IInputQuestion, IQuestion, Question } from '../models/question.model';

const questionDao = {

    async getQuestion(id: string): Promise<IQuestion | null> {
        return await Question.findOne({ _id: id }, {}, { lean: true });
    },

    async saveQuestion(inputQuestion: IInputQuestion): Promise<IQuestion> {
        const question = new Question(inputQuestion);
        console.log(question);
        return await question.save();
    },

    async deleteQuestion(id: string): Promise<void> {
        await Question.deleteOne({ _id: id });
    }

};

export default questionDao;



