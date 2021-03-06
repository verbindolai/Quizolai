import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import log from '../util/logger';

export const zodValidate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        log.debug('Request has valid schema.');
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
}


