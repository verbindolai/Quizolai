import { IQuestion } from "../models/question.model";
import questionDao from "../dao/question.dao";

export async function saveQuestion(question: IQuestion): Promise<IQuestion> {
    return questionDao.saveQuestion(question);
}