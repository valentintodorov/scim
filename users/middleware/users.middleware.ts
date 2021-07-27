import express from 'express';
import userService from '../services/users.service';
import debug from 'debug';
import Ajv from 'ajv';
import ScimError, { HttpStatusCode } from '../../common/scim-error';
import ajvSchemaCore20User from '../../common/scim-schemas/ajv-schemas/user';
import ajvSchemaExtensionEnterprise20User from './../../common/scim-schemas/ajv-schemas/enterprise-user';
import connectionManager from '../../common/services/connection-manager';

const log: debug.IDebugger = debug('app:users-middleware');
class UsersMiddleware {
    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try
        {
            const ajv = new Ajv({strict: false});
             ajv.addSchema(ajvSchemaCore20User, 'user');
             const validate = ajv.compile(ajvSchemaExtensionEnterprise20User);
            // or
            //const validate = ajv.compile(ajvSchemaCore20User);
        
            const valid = validate(req.body);
            if (valid) {
                next();
            } else {
                log('validateRequiredUserBodyFields ',validate.errors)
                next(new ScimError(`Error`, HttpStatusCode.BAD_REQUEST, `Missing required fields userName or externalId`, true));
            }
        } catch(err) {
            next(err);
        }
    }

    async validateSameUserNameDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
        const user = await userService.getUserByUserName(dbConnection, req.body.userName);
        if (user) {
            next(new ScimError(`Error`, HttpStatusCode.CONFLICT, `User userName already exists`, true));
        } else {
            next();
        }
    }

    async validateSameExternalIdDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
        const user = await userService.getUserByExternalId(dbConnection, req.body.externalId);
        if (user) {
            next(new ScimError(`Error`, HttpStatusCode.BAD_REQUEST, `User externalId already exists`, true));
        } else {
            next();
        }
    }

    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
        const user = await userService.getUserByEmail(dbConnection, req.body.email);
        if (user) {
            next(new ScimError(`Error`, HttpStatusCode.BAD_REQUEST, `User email already exists`, true));
        } else {
            next();
        }
    }
    
    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
        const user = await userService.getUserByEmail(dbConnection, req.body.email);
        if (user && user.id === req.params.userId) {
            next();
        } else {
            next(new ScimError(`Error`, HttpStatusCode.BAD_REQUEST, `Invalid email`, true));
        }
    }
    
    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating email', req.body.email);
    
            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };
    
    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
        const user = await userService.readById(dbConnection, req.params.userId, '');
        if (user) {
            next();
        } else {
            next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `User ${req.params.userId} not found`, true));
        }
    }

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }
}

export default new UsersMiddleware();
