import { IQuestionAnswer } from '@quizolai-shared/interface/question.interface';
import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import log from '../util/logger';
import { addTranslationsToQuestion, getProfanityRating } from '../service/question.service';
import { IQuestion, IInputQuestion } from "@quizolai-shared/interface/question.interface";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export class InputQuestion implements IInputQuestion {

    author: string;
    question: string;
    tags: string[];
    answers: IQuestionAnswer[];
    category: string;
    difficulty: number;

    constructor(author: string, question: string, tags: string[], answers: IQuestionAnswer[], category: string, difficulty: number) {
        this.author = author;
        this.question = question;
        this.tags = tags;
        this.answers = answers;
        this.category = category;
        this.difficulty = difficulty;
    }

    static fromObject(obj: any): InputQuestion {
        const answers = obj.answers.map((answer: IQuestionAnswer) => {
            return {
                answer: answer.answer,
                correct: answer.correct,
            }
        });
        return new InputQuestion(obj.author, obj.question, obj.tags, answers, obj.category, obj.difficulty);
    }

    toString(): string {
        return `{Author: ${this.author} - Question:${this.question} - Tags:${this.tags} - Answers:${this.answers} - Category:${this.category} - Difficulty:${this.difficulty}}`;
    }
}

const questionSchema = new Schema<IQuestion>(
    {
        questionID: { type: String, required: true, unique: true, default: () => `question_${nanoid()}` },
        userID: { type: String, required: true },
        author: { type: String, required: true },
        question: { type: String, required: true },
        tags: { type: [String], required: true },
        answers: { type: [{answer: String, correct: Boolean}], required: true },
        category: { type: String, required: false },
        difficulty: { type: Number, required: true },
        translations: { type: { en: String }, required: false },
        profanity: { type: Number, required: false, default: 1 },
        audited: { type: Boolean, required: true, default: false, select: false },
    },
    { timestamps: true }
);



questionSchema.post('save', async function (doc, next) {
    const question = doc;
    getProfanityRating(question.question).then((profanity) => {
        question.profanity = parseInt(profanity);
        Question.updateOne({ _id: question._id }, { $set: { profanity: question.profanity } }).then().catch((err) => log.error(err));
    }).catch(err => log.error(err)).finally(() => next())
})

questionSchema.post('save', async function (doc, next) {
    const question = doc;
    addTranslationsToQuestion(question).then(() => {
        Question.updateOne({ _id: question._id }, { $set: { translations: question.translations } }).then().catch((err) => log.error(err));
    }).catch(err => log.error(err)).finally(() => next())
});

questionSchema.post('insertMany', async function (doc, next) {
    const questions = doc;

    const updatePromises = questions.map(async (question : IQuestion) => {
        return getProfanityRating(question.question).then(profanity => {
            question.profanity = parseInt(profanity);
            return Question.updateOne({ _id: question._id }, { $set: { profanity: question.profanity } }).then().catch((err) => log.error(err))
        })
    });

    Promise.all(updatePromises).catch(err => log.error(err)).finally(() => next())
});

questionSchema.post('insertMany', async function (doc, next) {
    const questions = doc;

    const updatePromises = questions.map(async (question : IQuestion) => {
        return addTranslationsToQuestion(question).then(() => {
            return Question.updateOne({ _id: question._id }, { $set: { translations: question.translations } }).then().catch((err) => log.error(err))
        })
    });

    Promise.all(updatePromises).catch(err => log.error(err)).finally(() => next());
});

export const Question = model<IQuestion>('Question', questionSchema);


