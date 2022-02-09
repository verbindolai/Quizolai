import {auth} from "express-oauth2-jwt-bearer";
import {NextFunction, Request, Response} from "express";


export const checkJwt = auth({
    audience: 'https://quizolai.de/api',
    issuerBaseURL: `https://devolai.eu.auth0.com/`,

});


export function checkPermissions(permission: string[]) {

    let includeAll = (arr: any[], target: any[]) => target.every(v => arr.includes(v));

    return (req: Request, res: Response, next: NextFunction) => {
        if (req.auth) {
            const foundPermissions = req.auth.payload.permissions as string[];
            if (foundPermissions)
                if (includeAll(foundPermissions, permission)) {
                    next();
                } else {
                    res.sendStatus(403)
                }
        }
    }
}