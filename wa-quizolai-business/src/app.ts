import express from 'express';
import log from './util/logger';
import config from 'config';
import { connect } from './util/connect';
import apiRoutes from './routing/api.routes'
import helmet from 'helmet';
import cors from 'cors';
const port = config.get<number>('port');
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }))
app.use("/api", apiRoutes);
app.listen(port, async () => {
    log.info('Server is running on port ' + port);
    await connect();
});