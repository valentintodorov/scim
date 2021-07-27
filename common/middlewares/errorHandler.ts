import express from 'express';
import debug from 'debug';
import ScimErrorSchema from  '../scim-schemas/scim-error-schema';
import ScimError from './../scim-error';

const log: debug.IDebugger = debug('app:errors-handler-middleware');
class ErrorsHandlerMiddleware {
    errorHandler = async (
        err: Error, 
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if(this.isTrustedError(err)) {
            let e = err as ScimError;
            res.status(e.httpCode).send(ScimErrorSchema.jsonErr(e.httpCode , e.message));
        } else {
            res.status(500).send(ScimErrorSchema.jsonErr(500 , 'Internal Server Error'));
        }
        log(err.name);
        log(err.message);
        log(err.stack);
    }

    isTrustedError(error: Error) {
        if (error instanceof ScimError) {
          return error.isOperational;
        }
        return false;
      }
}

export default new ErrorsHandlerMiddleware();