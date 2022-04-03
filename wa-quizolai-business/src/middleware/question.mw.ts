import {checkExistingUserId, checkJwt, checkPermissions, PERMISSONS} from "./auth.mw";
import {zodValidate} from "./validate.mw";
import {
    deleteQuestionSchema,
    getQuestionSchema,
    questionBodySchema
} from "../zod-schemas/question.zod-schema";


const QuestionMiddleware = {
    add() {
        return [
            zodValidate(questionBodySchema),
            checkJwt,
            checkExistingUserId,
            checkPermissions([PERMISSONS.Q_ADD])
        ];
    },
    get() {
        return [zodValidate(getQuestionSchema)];
    },
    update() {
        return [
            zodValidate(questionBodySchema),
            checkJwt,
            checkExistingUserId
        ];

    },
    delete() {
        return [
            zodValidate(deleteQuestionSchema),
            checkJwt,
            checkExistingUserId,
        ];
    },
}

export default QuestionMiddleware;
