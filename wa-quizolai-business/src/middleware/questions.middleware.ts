import {checkExistingUserId, checkJwt, checkPermissions, checkUserIDMatch, PERMISSONS} from "./auth.middleware";
import {zodValidate} from "./validate.middleware";
import {
    getQuestionsFromUserSchema,
    getRandomQuestionsSchema,
    questionArrayBodySchema
} from "../zod-schemas/question.zod";

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
    getRandom(){
        return [zodValidate(getRandomQuestionsSchema)];
    },

    getCSV() {
        return [zodValidate(questionArrayBodySchema)];
    }
}
export default QuestionsMiddleware;