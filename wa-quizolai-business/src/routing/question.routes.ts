import QuestionController from "../controller/question.controller";
import express from "express";
import QuestionMiddleware from "../middleware/question.middleware";


const router = express.Router();


router.get(
    '/id/:id',
    [...QuestionMiddleware.get()],
    QuestionController.get
);
router.get(
    '/random',
    [],
    QuestionController.random
);
router.post(
    '/',
    [...QuestionMiddleware.add()],
    QuestionController.add
);
router.put(
    '/id/:id',
    [...QuestionMiddleware.update()],
    QuestionController.update
);
router.delete(
    '/id/:id',
    [...QuestionMiddleware.delete()],
    QuestionController.delete
);

export default router;