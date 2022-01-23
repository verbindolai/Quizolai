import { Express, Request, Response } from 'express';
import log from './logger';
import validateResource from './middleware/validateResource';
import { Question } from './models/question.model';
import { saveQuestion } from './service/question.service';
import { questionSchema } from './zod-schemas/question.zod-schema';

function routes(app: Express) {
    app.get('/ping', (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post('/api/question', validateResource(questionSchema), async (req: Request, res: Response) => {
        const savedQuestion = await saveQuestion(req.body);
        res.send(savedQuestion);
    });
}

export default routes;