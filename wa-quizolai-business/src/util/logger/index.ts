import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const log = logger({
    level: process.env.LOG_LEVEL || config.get<string>("loglvl") || "info",
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`,
});
export default log;