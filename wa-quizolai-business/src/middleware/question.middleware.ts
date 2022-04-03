import {checkExistingUserId, checkJwt, checkPermissions, PERMISSONS} from "./auth.middleware";
import {zodValidate} from "./validate.middleware";
import {
    deleteQuestionSchema,
    getQuestionSchema,
    questionBodySchema
} from "../zod-schemas/question.zod";


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
