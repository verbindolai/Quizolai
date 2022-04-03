import express from "express";
import QuestionsController from "../controller/questions.controller";
import QuestionsMiddleware from "../middleware/questions.middleware";


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

router.post(
    "/getCSV",
    [...QuestionsMiddleware.getCSV()],
    QuestionsController.getCSV
);


router.get(
    "/user/:userId",
    [...QuestionsMiddleware.getByUser()],
    QuestionsController.getByUser
);

router.get(
    "/random/:count",
    [...QuestionsMiddleware.getRandom()],
    [],
    QuestionsController.getRandom
)

export default router;