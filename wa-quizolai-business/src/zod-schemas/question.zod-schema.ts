import { object, number, string, array, TypeOf } from "zod";

export const questionSchema = object({
    body: object({
        author: string({
            required_error: "Full name is required",
        }),
        question: string({
            required_error: "Question is required",
        }),
        tags: array(string()).optional(),

        answers: array(string(), {
            required_error: "Answers are required",
        }),
        correctAnswer: number({
            required_error: "Correct answer is required",
        }),
        category: string({
            required_error: "Category is required",
        }),
        difficulty: number({
            required_error: "Difficulty is required",
        }),
    })
});


export type QuestionSchema = TypeOf<typeof questionSchema>;