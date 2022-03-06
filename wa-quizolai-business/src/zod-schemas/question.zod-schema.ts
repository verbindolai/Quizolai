import { object, number, string, array, TypeOf, boolean } from "zod";

export const questionSchema = object({
    author: string({
        required_error: "Author is required",
    }).nonempty("Author cant be empty."),
    question: string({
        required_error: "Question is required",
    }).nonempty("Question cant be empty."),
    tags: array(string(), {
        required_error: "Tags are required",
    }),
    answers: array(object({
        answer: string({
            required_error: "Answer is required",
        }),
        correct: boolean({
            required_error: "Correct is required",
        }),
    })).nonempty({
        message: "Answers can't be empty.",
    }),
    category: string({
        required_error: "Category is required",
    }),
    difficulty: number({
        required_error: "Difficulty is required",
    }),
})


export const questionBodySchema = object({
    body: questionSchema,
});

export const questionArrayBodySchema = object({
    body: array(questionSchema, {
        required_error: "Questions are required.",
    }).nonempty({
        message: "Questions can't be empty.",
    })
});

export const deleteQuestionSchema = object({
    params: object({
        id: string({
            required_error: "Question ID is required",
        }),
    }),
});


export const getQuestionsFromUserSchema = object({
    params: object({
        userId: string({
            required_error: "User Id is required",
        }),
    }),
});


export const getQuestionSchema = deleteQuestionSchema;

export type DeleteQuestionSchema = TypeOf<typeof deleteQuestionSchema>;

export type QuestionSchema = TypeOf<typeof questionBodySchema>;

export type GetQuestionSchema = TypeOf<typeof getQuestionSchema>;

export type GetQuestionsFromUserSchema = TypeOf<typeof getQuestionsFromUserSchema>;