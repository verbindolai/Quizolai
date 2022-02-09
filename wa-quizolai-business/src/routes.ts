import {Express, NextFunction, Request, Response} from 'express';
import { StatusCodeError } from './util/exceptions/exceptions';
import log from './util/logger';
import { zodValidate, checkObjectID } from './middleware';
import { InputQuestion } from './models/question.model';
import questionDao from './dao/question.dao';
import { deleteQuestionSchema, getQuestionSchema, questionBodySchema, questionArrayBodySchema } from './zod-schemas/question.zod-schema';
import * as auth from './middleware/auth.mw';


function routes(app: Express) {

    app.get('/ping', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post('/api/question', zodValidate(questionBodySchema), async (req: Request, res: Response) => {
        try {
            const savedQuestion = await questionDao.saveQuestion(InputQuestion.fromObject(req.body));
            res.send(savedQuestion);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    //Array of q
    app.post('/api/questions', [zodValidate(questionArrayBodySchema)], async (req: Request, res: Response) => {
        try {
            const questions = req.body.map(InputQuestion.fromObject)
            log.debug(questions);

            const savedQuestions = await questionDao.saveQuestions(questions);
            res.send(savedQuestions);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });


    app.get('/api/question/:id', [zodValidate(getQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const question = await questionDao.getQuestion(req.params.id);
            res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    //route to get all questions with profanity rating 0 , allowSafeQuestionRead
    app.get('/api/questions', [auth.checkJwt, auth.checkPermissions(["read:safequestions"])], async (req: Request, res: Response) => {
        try {
            const questions = await questionDao.getSaveQuestions();
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

    //TODO authentication, user can only update their own questions!!!
    //route to update a question
    app.put('/api/question/:id', [auth.checkJwt, zodValidate(questionBodySchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const inputQuestion = InputQuestion.fromObject(req.body);
            const id = req.params.id;
           const question = await questionDao.updateQuestion(id, inputQuestion);
           res.status(200).send(question);
        } catch (err) {
            handleError(err, req, res, null);
        }
    });

    app.delete('/api/question/:id', [zodValidate(deleteQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            log.debug("Deleting: " + req.params.id);
            const deletedQuestion = await questionDao.deleteQuestion(req.params.id);
            res.send(deletedQuestion);
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