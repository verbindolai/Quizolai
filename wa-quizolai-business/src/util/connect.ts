import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

export async function connect() {
    const dbURI = config.get<string>('dbURI');
    try {
        log.debug("Env-Variables: \n" + process.env);
        await mongoose.connect(dbURI, { user: process.env.MONGO_USERNAME, pass: process.env.MONGO_PASSWORD });
        log.info('Connected to MongoDB');
    } catch (err) {
        log.error(err);
    }
}