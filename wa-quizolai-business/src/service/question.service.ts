import {IInputQuestion, IQuestion} from "../../../wa-quizolai-shared";
import axios from 'axios';
import config from 'config';
import log from '../util/logger';
import {Question} from "../models/question.model";
import {StatusCodeError} from "../util/exceptions/exceptions";
import {hasPermission} from "./auth.service";
import {PERMISSONS} from "../middleware/auth.middleware";

const QuestionService = {
    async saveQuestion(inputQuestion: IInputQuestion, userID : string): Promise<IQuestion> {
        const nq = new Question(inputQuestion);
        nq.userID = userID;
        return await nq.save();
    },



    async deleteQuestion(id: string, userID : string, permissions : string[]): Promise<IQuestion> {

        let question = await Question.findOne({ _id: id });
        if (!question) {
            throw new StatusCodeError( 'Question not found', 404);
        }
        if (question.userID !== userID && !hasPermission([PERMISSONS.Q_EDIT], permissions)) {
            console.log(permissions)
            throw new StatusCodeError(`You don't have permission to delete this question`, 403);
        }
        question = await Question.findOneAndDelete({ _id: id });

        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return question;
    },

    async getQuestion(id: string): Promise<IQuestion> {
        const question = await Question.findOne({ _id: id }, {}, { lean: true });
        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return question;
    },

    async updateQuestion(id: string, inputQuestion: IInputQuestion, userID : string, permissions : string[]): Promise<IQuestion> {
        const question = await Question.findOne({ _id: id });

        if (!question) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        if (question.userID !== userID && !hasPermission([PERMISSONS.Q_EDIT], permissions)) {
            throw new StatusCodeError(`You don't have permission to edit this question`, 403);
        }

        const updatedQuestion = await Question.findOneAndUpdate({ _id: id }, inputQuestion, { new: true, upsert: false });
        if (!updatedQuestion) {
            throw new StatusCodeError(`Question with id ${id} not found`, 404);
        }
        return updatedQuestion;
    },



    async getRandomQuestion() {
        const estimatedCount = await Question.estimatedDocumentCount();
        const random = Math.floor(Math.random() * estimatedCount);
        return Question.findOne({}, {}, { lean: true, skip: random });
    }
}

export default QuestionService;

export async function getProfanityRating(text: string): Promise<string> {

    const url = config.get<string>('openaiFilterURL');
    const auth = config.get<string>('openaiAUTH');

    log.debug(`Calling openai filter with url: ${url}`);

    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json'
            },
            data: {
                prompt: `<|endoftext|>${text}\n--\nLabel:`,
                temperature: 0,
                max_tokens: 1,
                top_p: 0,
                logprobs: 10,
            }
        });
        const profanity = response.data.choices[0].text as string;
        log.debug(`Profanity: ${profanity}`);
        return profanity;
    } catch (err) {
        log.error(err);
        throw new Error("Error getting profanity rating from openAI");
    }
}


export async function addTranslationsToQuestion(question: IQuestion) {

    const url = config.get<string>('deeplURL');
    const auth = config.get<string>('deeplAUTH');

    const queryString = `${url}?text=${question.question}&target_lang=EN&auth_key=${auth}`;

    log.debug(`Calling deepl with url: ${queryString}`);

    try {
        const response = await axios.get(queryString);
        const translation = response.data.translations[0];
        if (translation.detected_source_language === 'EN') {
            log.debug('Question is already in english, translating to german.');
            const en = question.question;
            try {
                const response = await axios.get(`${url}?text=${question.question}&target_lang=DE&auth_key=${auth}`);
                const germanTranslation = response.data.translations[0];
                question.question = germanTranslation.text;
                question.translations = {
                    en: en
                };
            } catch (err) {
                log.error("Can't translate question." + err);
            }
        } else if (translation.detected_source_language === 'DE') {
            log.debug("German detected");
            question.translations = {
                en: translation.text
            };
        };
    } catch (err) {
        log.error("Can't translate question." + err);
    }
}