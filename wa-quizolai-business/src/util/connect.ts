import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

export async function connect() {
    const dbURI = config.get<string>('dbURI');
    try {
        const userName: string = process.env.MONGO_USERNAME || config.get<string>('dbUser')
        const password: string = process.env.MONGO_PASSWORD || config.get<string>('dbPassword')

        await mongoose.connect(dbURI, { user: userName, pass: password });
        log.info('Connected to MongoDB');
    } catch (err) {
        log.error(err);
    }
}