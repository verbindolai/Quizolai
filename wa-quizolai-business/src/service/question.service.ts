import { IInputQuestion, IQuestion, Question } from "../models/question.model";
import questionDao from "../dao/question.dao";
import axios from 'axios';
import config from 'config';
import log from '../logger';
import { StatusCodeError } from "../exceptions/exceptions";

export async function saveQuestion(question: IInputQuestion): Promise<IQuestion> {

    // if (question.questionID) {
    //     const foundQuestion = await Question.findOne({ questionID: question.questionID });
    //     if (foundQuestion) {
    //         throw new StatusCodeError("Question already exists", 400);
    //     }
    // }
    return questionDao.saveQuestion(question);

}

export async function deleteQuestion(id: string): Promise<void> {
    const question = await Question.findOne({ id: id });
    if (!question) {
        throw new StatusCodeError(`Question with id ${id} not found`, 404);
    }
    return questionDao.deleteQuestion(id);
}

export async function getQuestion(id: string): Promise<IQuestion> {
    const question = await questionDao.getQuestion(id);
    if (!question) {
        throw new StatusCodeError(`Question with id ${id} not found`, 404);
    }
    return question;
}


export async function getProfanityRating(text: string): Promise<string> {

    const url = config.get<string>('openaiFilterURL');
    const auth = config.get<string>('openaiAUTH');

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

    log.debug("Query: " + queryString)

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