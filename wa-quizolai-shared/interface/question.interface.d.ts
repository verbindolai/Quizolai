export interface IQuestionAnswer {
    answer: string;
    correct: boolean;
}

export interface ITag {
    name: string;
}

export interface IInputQuestion {
    author: string;
    question: string;
    tags: string[];
    answers: IQuestionAnswer[];
    category: string;
    difficulty: number;
}
export interface IQuestion extends IInputQuestion {
    _id: string;
    userID: string;
    questionID: string;
    translations?: {
        en: string;
    };
    profanity: number;
    audited: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=question.interface.d.ts.map