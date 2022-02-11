import {auth} from "express-oauth2-jwt-bearer";
import {NextFunction, Request, Response} from "express";
import {includeAll} from "../../../wa-quizolai-shared/util";
import log from "../util/logger";


export const checkJwt = auth({
    audience: 'https://quizolai.de/api',
    issuerBaseURL: `https://devolai.eu.auth0.com/`,

});


export function checkPermissions(permission: string[]) {


    return (req: Request, res: Response, next: NextFunction) => {
        if (req.auth) {
            const foundPermissions = req.auth.payload.permissions as string[];
            log.debug(`foundPermissions: ${foundPermissions}`);
            if (foundPermissions)
                if (includeAll(permission, foundPermissions)) {
                    next();
                } else {
                    res.sendStatus(403)

                }
        }
    }
}


export function checkUserID(req: Request, res: Response, next: NextFunction) {
    if(!req.auth || !req.auth.payload.sub){
        res.sendStatus(400);
    }
    next();
}