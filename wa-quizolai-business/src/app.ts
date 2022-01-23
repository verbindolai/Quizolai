import express from 'express';
import log from './logger';
import config from 'config';
import { connect } from './util/connect';
import routes from './routes';

const port = config.get<number>('port');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, async () => {
    log.info('Server is running on port ' + port);

    await connect();

    routes(app);
});