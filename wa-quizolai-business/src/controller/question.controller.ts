import log from "../util/logger";
import {Request, Response} from 'express';
import {InputQuestion} from "../models/question.model";
import QuestionService from "../service/question.service";
import {handleError} from "./questions.controller";

const QuestionController = {

    async get(req: Request, res: Response) {
        try {
            const question = await QuestionService.getQuestion(req.params.id);
            log.debug("Getting Question with id " + req.params.id);
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },

    async add(req: Request, res: Response) {
        try {
            const question = InputQuestion.fromObject(req.body);
            const userID = req.auth?.payload.sub as string;
            log.debug("Adding Question from User:" + userID);
            const savedQuestion = await QuestionService.saveQuestion(question, userID);
            res.status(200).send(savedQuestion);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },


    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const userID = req.auth?.payload.sub as string;
            const permissions = req.auth?.payload.permissions as string[];
            log.debug("Deleting Questions with ID: "+ id + " from User: " + userID + ". Permissions: " + permissions);

            const deletedQuestion = await QuestionService.deleteQuestion(id, userID, permissions);
            res.status(200).send(deletedQuestion);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },
    async update(req: Request, res: Response) {
        try {
            const inputQuestion = InputQuestion.fromObject(req.body);
            const id = req.params.id;
            const userID = req.auth?.payload.sub as string;
            const permissions = req.auth?.payload.permissions as string[];
            log.debug("Updating Questions with ID: "+ id + " from User: " + userID + ". Permissions: " + permissions);
            const question = await QuestionService.updateQuestion(id, inputQuestion, userID, permissions);
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },
    async random(req: Request, res: Response) {
        try {
            const question = await QuestionService.getRandomQuestion();
            log.debug("Getting Random Question");
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    },

}


export default QuestionController;