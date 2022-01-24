import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { addTranslationsToQuestion } from '../service/question.service';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface IQuestion {
    questionID: string;
    author: string;
    question: string;
    tags: string[];
    answers: string[];
    correctAnswer: number;
    category: string;
    difficulty: number;
    translations?: {
        en: string;
    };
    // for mongoose
    createdAt: Date;
    updatedAt: Date;
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
    },
    { timestamps: true }
);

questionSchema.pre('save', async function (next) {
    const question = this as IQuestion;
    await addTranslationsToQuestion(question);
})

export const Question = model<IQuestion>('Question', questionSchema);

