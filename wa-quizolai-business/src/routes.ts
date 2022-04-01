import {Express, NextFunction, Request, Response} from 'express';
import {StatusCodeError} from './util/exceptions/exceptions';
import log from './util/logger';
import {zodValidate, checkObjectID} from './middleware';
import {InputQuestion} from './models/question.model';
import questionDao from './dao/question.dao';
import {
    deleteQuestionSchema,
    getQuestionSchema,
    questionBodySchema,
    questionArrayBodySchema, getQuestionsFromUserSchema
} from './zod-schemas/question.zod-schema';
import * as auth from './middleware/auth.mw';


function routes(app: Express) {

    app.get('/ping', (req: Request, res: Response) => {
        res.sendStatus(200).send("pong");
    });

    app.post('/api/question', [auth.checkJwt, auth.checkPermissions(["add:questions"]), auth.checkUserID(), zodValidate(questionBodySchema)], async (req: Request, res: Response) => {
        try {
            const question = InputQuestion.fromObject(req.body);
            const userID = req.auth?.payload.sub as string;
            log.debug("Adding Question from User:" + userID);
            const savedQuestion = await questionDao.saveQuestion(question, userID);
            res.status(200).send(savedQuestion);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    //Array of questions
    app.post('/api/questions', [auth.checkJwt, auth.checkPermissions(["add:questions"]), auth.checkUserID(), zodValidate(questionArrayBodySchema)], async (req: Request, res: Response) => {
        try {
            const permissions = req.auth?.payload.permissions as string[];
            const questions: InputQuestion[] = req.body.map(InputQuestion.fromObject)
            const userID = req.auth?.payload.sub as string;
            log.debug("Adding Questions from User:" + userID);
            const savedQuestions = await questionDao.saveQuestions(questions, userID);
            res.status(200).send(savedQuestions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });


    app.get('/api/question/:id', [zodValidate(getQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const question = await questionDao.getQuestion(req.params.id);
            log.debug("Getting Question with id " + req.params.id);
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    //route to get all questions from a specific user
    app.get('/api/questions/user/:userId', [zodValidate(getQuestionsFromUserSchema), auth.checkJwt, auth.checkPermissions(["read:questions"]), auth.checkUserID(true)], async (req: Request, res: Response) => {
        try {
            const userID = req.params.userId;
            const questions = await questionDao.getQuestionsByUser(userID);
            log.debug("Getting Questions from User:" + userID);
            res.status(200).send(questions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });


    //route to get all questions with profanity rating 0 , allowSafeQuestionRead
    app.get('/api/questions', [], async (req: Request, res: Response) => {
        try {
            const questions = await questionDao.getSaveQuestions();
          console.log(questions);
            log.debug("Getting Questions.");
            res.status(200).send(questions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    // app.get('/api/questions', [auth.checkJwt, auth.checkPermissions(["read:questions"])], async (req: Request, res: Response) => {
    //     try {
    //         const questions = await questionDao.getQuestions();
    //         res.status(200).send(questions);
    //     } catch (err) {
    //         handleError(err, req, res, null);
    //     }
    // });

    app.put('/api/question/:id', [auth.checkJwt, auth.checkUserID(), zodValidate(questionBodySchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const inputQuestion = InputQuestion.fromObject(req.body);
            const id = req.params.id;
            const userID = req.auth?.payload.sub as string;
            const permissions = req.auth?.payload.permissions as string[];
            log.debug("Updating Questions with ID: "+ id + " from User: " + userID + ". Permissions: " + permissions);
            const question = await questionDao.updateQuestion(id, inputQuestion, userID, permissions);
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    app.delete('/api/question/:id',  [auth.checkJwt, auth.checkUserID(), zodValidate(deleteQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const userID = req.auth?.payload.sub as string;
            const permissions = req.auth?.payload.permissions as string[];
            log.debug("Deleting Questions with ID: "+ id + " from User: " + userID + ". Permissions: " + permissions);

            const deletedQuestion = await questionDao.deleteQuestion(id, userID, permissions);
            res.status(200).send(deletedQuestion);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });
}

function handleError(err: any, req: Request, res: Response, next: any) {
    if (err instanceof StatusCodeError) {
        log.debug(err);
        log.info(err);
        return res.status(err.code).send(err.message);
    } else {
        log.error(err);
        return res.sendStatus(500);
    }
}

export default routes;