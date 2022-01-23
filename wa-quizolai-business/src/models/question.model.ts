import { Schema, model } from 'mongoose';

export interface IQuestion {
    author: string;
    question: string;
    tags: string[];
    answers: string[];
    correctAnswer: number;
    category: string;
    difficulty: number;

    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
    {
        author: { type: String, required: true },
        question: { type: String, required: true },
        tags: { type: [String], required: true },
        answers: { type: [String], required: true },
        correctAnswer: { type: Number, required: true },
        category: { type: String, required: true },
        difficulty: { type: Number, required: true },
    },
    { timestamps: true }
);


export const Question = model<IQuestion>('Question', questionSchema);

