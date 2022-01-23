import { IQuestion, Question } from '../models/question.model';

const questionDao = {

    async getQuestion(id: number): Promise<IQuestion> {
        const question = await Question.findOne({ id });
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    },

    async saveQuestion(question: IQuestion): Promise<IQuestion> {
        const newQuestion = new Question(question);
        return await newQuestion.save();
    }
};

export default questionDao;



