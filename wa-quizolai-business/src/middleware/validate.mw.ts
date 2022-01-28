import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { AnyZodObject } from 'zod';
import log from '../util/logger';

export const zodValidate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
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

//Needed because zods instanceof somehow doesn't work
export function checkObjectID(req: Request, res: Response, next: NextFunction): Response | void {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ID");
    }
    next();
}
