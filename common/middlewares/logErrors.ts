import debug from 'debug';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const log: debug.IDebugger = debug('app:log-error');

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
        format: winston.format.combine(
                winston.format.json(),
                winston.format.prettyPrint(),
                winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
    if (typeof global.it === 'function') {
        loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
    }
}

const logErrors = expressWinston.logger(loggerOptions);
export default logErrors;

