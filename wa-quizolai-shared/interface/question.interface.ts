export interface IInputQuestion {
    author: string;
    question: string;
    tags: string[];
    answers: string[];
    correctAnswer: number;
    category: string;
    difficulty: number;
}

export interface IQuestion extends IInputQuestion {
    questionID: string;
    translations?: {
        en: string;
    };
    profanity: number;
    audited: boolean;

    // for mongoose
    createdAt: Date;
    updatedAt: Date;
}