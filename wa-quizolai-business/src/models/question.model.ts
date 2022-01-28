import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import log from '../util/logger';
import { addTranslationsToQuestion, getProfanityRating } from '../service/question.service';
import { IQuestion, IInputQuestion } from "../../../wa-quizolai-shared";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export class InputQuestion implements IInputQuestion {

    author: string;
    question: string;
    tags: string[];
    answers: string[];
    correctAnswer: number;
    category: string;
    difficulty: number;

    constructor(author: string, question: string, tags: string[], answers: string[], correctAnswer: number, category: string, difficulty: number) {
        this.author = author;
        this.question = question;
        this.tags = tags;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.category = category;
        this.difficulty = difficulty;
    }

    static fromObject(obj: IInputQuestion): InputQuestion {
        return new InputQuestion(obj.author, obj.question, obj.tags, obj.answers, obj.correctAnswer, obj.category, obj.difficulty);
    }

}

const questionSchema = new Schema<IQuestion>(
    {
        questionID: { type: String, required: true, unique: true, default: () => `question_${nanoid()}` },
        author: { type: String, required: true },
        question: { type: String, required: true },
        tags: { type: [String], required: true },
        answers: { type: [String], required: true },
        correctAnswer: { type: Number, required: true },
        category: { type: String, required: true },
        difficulty: { type: Number, required: true },
        translations: { type: { en: String }, required: false },
        profanity: { type: Number, required: false, default: 0 },
        audited: { type: Boolean, required: true, default: false, select: false },
    },
    { timestamps: true }
);



questionSchema.post('save', async function (doc, next) {
    const question = doc;
    getProfanityRating(question.question).then((profanity) => {
        question.profanity = profanity;
        Question.updateOne({ _id: question._id }, { $set: { profanity: question.profanity } }).then().catch((err) => log.error(err));
    }).catch(err => log.error(err)).finally(() => next())
})

questionSchema.post('save', async function (doc, next) {
    const question = doc;
    addTranslationsToQuestion(question).then(() => {
        Question.updateOne({ _id: question._id }, { $set: { translations: question.translations } }).then().catch((err) => log.error(err));
    }).catch(err => log.error(err)).finally(() => next())
});

export const Question = model<IQuestion>('Question', questionSchema);


