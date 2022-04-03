import express from "express";
import questionRoutes from "./question.routes";
import questionsRoutes from "./questions.routes";

const router = express.Router();

router.use("/question", questionRoutes);
router.use("/questions", questionsRoutes);

export default router;