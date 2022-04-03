import {auth} from "express-oauth2-jwt-bearer";
import {NextFunction, Request, Response} from "express";
import {includeAll} from "../../../wa-quizolai-shared/util";
import log from "../util/logger";


export const checkJwt = auth({
    audience: 'https://quizolai.de/api',
    issuerBaseURL: `https://devolai.eu.auth0.com/`,

});

export const PERMISSONS = {
    Q_READ : 'read:questions',
    Q_SAFE_READ : 'read:safequestions',
    Q_ADD : 'add:questions',
    Q_EDIT : 'edit:questions',
}


export function checkPermissions(permission: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.auth) {
            const foundPermissions = req.auth.payload.permissions as string[];
            console.log(foundPermissions);
            if (foundPermissions)
                if (includeAll(permission, foundPermissions)) {
                    next();
                } else {
                    log.warn(`User ${req.auth.payload.sub} has no permission ${permission}`);
                    res.sendStatus(403)

                }
        }
    }
}


export function checkExistingUserId(req: Request, res: Response, next: NextFunction) {
    if(!req.auth || !req.auth.payload.sub){
        log.warn(`Missing user id`);
        res.sendStatus(400);
    } else {
        next();
    }
}

export function checkUserIDMatch(req: Request, res: Response, next: NextFunction) {
    checkExistingUserId(req, res, () => {
        if(req.auth?.payload.sub === req.params.userId){
            next();
        } else {
            log.warn(`User ${req.auth?.payload.sub} tried to access user ${req.params.userId}`);
            res.sendStatus(403);
        }
    });
}



