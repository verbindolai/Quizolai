import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import log from '../logger';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        log.debug('Request is valid.');
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }

}
export default validate;