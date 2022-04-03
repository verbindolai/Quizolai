import QuestionsService from "../service/questions.service";
import {Express, NextFunction, Request, Response} from 'express';
import log from "../util/logger";
import {StatusCodeError} from "../util/exceptions/exceptions";
import {InputQuestion} from "../models/question.model";


const QuestionsController = {

    async getSafe(req : Request, res: Response) {
        try {
            const questions = await QuestionsService.getSafeQuestions();
            console.log(questions);
            log.debug("Getting Questions.");
            res.status(200).send(questions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },
    async create(req: Request, res: Response) {
        try {
            const permissions = req.auth?.payload.permissions as string[];
            const questions: InputQuestion[] = req.body.map(InputQuestion.fromObject)
            const userID = req.auth?.payload.sub as string;
            log.debug("Adding Questions from User:" + userID);
            const savedQuestions = await QuestionsService.createQuestions(questions, userID);
            res.status(200).send(savedQuestions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },
    async getByUser(req: Request, res: Response) {
        try {
            const userID = req.params.userId;
            const questions = await QuestionsService.getQuestionsByUser(userID);
            log.debug("Getting Questions from User: " + userID);
            res.status(200).send(questions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    }
}

export function handleError(err: any, req: Request, res: Response, next: any) {
    if (err instanceof StatusCodeError) {
        log.debug(err);
        log.info(err);
        return res.status(err.code).send(err.message);
    } else {
        log.error(err);
        return res.sendStatus(500);
    }
}


export default QuestionsController;