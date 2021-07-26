import express from 'express';
import debug from 'debug';
import ScimErrorSchema from  '../scim-schemas/scim-error-schema';
import ScimError from './../scim-error';

const log: debug.IDebugger = debug('app:users-controller');
class ErrorsHandlerMiddleware {
    errorHandler = async (
        err: Error, 
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if(this.isTrustedError(err)) {
            log(err.name);
            log(err.message);
            log(err.stack);
            let e = err as ScimError;
            res.status(e.httpCode).send(ScimErrorSchema.jsonErr(e.httpCode , e.message));
        } else {
            log(err.name);
            log(err.message);
            log(err.stack);
            res.status(500).send(ScimErrorSchema.jsonErr(500 , 'Internal Server Error'));
        }
    }

    isTrustedError(error: Error) {
        if (error instanceof ScimError) {
          return error.isOperational;
        }
        return false;
      }
}

export default new ErrorsHandlerMiddleware();