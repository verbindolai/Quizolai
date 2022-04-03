import {checkExistingUserId, checkJwt, checkPermissions, checkUserIDMatch, PERMISSONS} from "./auth.mw";
import {zodValidate} from "./validate.mw";
import {getQuestionsFromUserSchema, questionArrayBodySchema} from "../zod-schemas/question.zod-schema";
import {Express, NextFunction, Request, Response} from 'express';

const QuestionsMiddleware = {
    add() {
        return [
            zodValidate(questionArrayBodySchema),
            checkJwt,
            checkExistingUserId,
            checkPermissions([PERMISSONS.Q_ADD]),
        ]

    },
    getByUser() {
        return [
            zodValidate(getQuestionsFromUserSchema),
            checkJwt,
            checkUserIDMatch,
        ];
    },

}
export default QuestionsMiddleware;