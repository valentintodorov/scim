import express from 'express';
import debug from 'debug';

// import * as winston from 'winston';
// import * as expressWinston from 'express-winston';
import connectionManager from '../services/connection-manager';
const log: debug.IDebugger = debug('app:request-log-middleware');

class RequestLogMiddleware {
    logToDbHandler = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            next();

            let entry: any = { timestamp: new Date() };
            entry.body = req.body;
            entry.url = req.url;
            entry.query = req.query;
            entry.hostname = req.hostname;

            const dbConnection = connectionManager.getLogsDbConnection('logs');
            dbConnection.collection('log').insertOne(entry).then(() => {
                //log('logged');
            }).catch((err: any)=>{
                log(err);
            });
        } catch (err) {
            log(err);
            next(err); 
        }
    }
}
export default new RequestLogMiddleware();
