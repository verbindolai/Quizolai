import { Express, Request, Response } from 'express';
import { StatusCodeError } from './exceptions/exceptions';
import log from './logger';
import validateResource from './middleware/validate.mw';
import { checkObjectID } from './middleware/validate.mw';
import { Question } from './models/question.model';
import { deleteQuestion, getQuestion, saveQuestion } from './service/question.service';
import { deleteQuestionSchema, getQuestionSchema, questionSchema } from './zod-schemas/question.zod-schema';

function routes(app: Express) {

    app.get('/ping', (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post('/api/question', validateResource(questionSchema), async (req: Request, res: Response) => {
        try {
            const savedQuestion = await saveQuestion(req.body);
            res.send(savedQuestion);
        } catch (err) {
            if (err instanceof StatusCodeError) {
                log.debug(err);
                return res.status(err.code).send(err.message);
            } else {
                log.error(err);
                return res.sendStatus(500);
            }
        }
    });

    app.get('/api/question/:id', [validateResource(getQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            const question = await getQuestion(req.params.id);
            res.status(200).send(question);
        } catch (err) {
            if (err instanceof StatusCodeError) {
                log.debug(err);
                return res.status(err.code).send(err.message);
            } else {
                log.error(err);
                return res.sendStatus(500);
            }
        }
    });

    app.delete('/api/question/:id', [validateResource(deleteQuestionSchema), checkObjectID], async (req: Request, res: Response) => {
        try {
            await deleteQuestion(req.params.id);
            res.sendStatus(200);
        } catch (err) {
            if (err instanceof StatusCodeError) {
                log.debug(err);
                return res.status(err.code).send(err.message);
            } else {
                log.error(err);
                return res.sendStatus(500);
            }
        }
    });
}

export default routes;