import express from "express";
import QuestionsController from "../controller/questions.controller";
import QuestionsMiddleware from "../middleware/questions.mw";


const router = express.Router();


router.get(
    "/",
    [],
    QuestionsController.getSafe
);
router.post(
    "/",
    [...QuestionsMiddleware.add()],
    QuestionsController.create
);
router.get(
    "/user/:userId",
    [...QuestionsMiddleware.getByUser()],
    QuestionsController.getByUser
);

export default router;