import express from 'express';
import groupService from '../services/groups.service';
import debug from 'debug';
import Ajv from 'ajv';
import ScimError, { HttpStatusCode } from '../../common/scim-error';
import ajvSchemaCore20User from '../../common/scim-schemas/ajv-schemas/user';
import ajvSchemaExtensionEnterprise20User from './../../common/scim-schemas/ajv-schemas/enterprise-user';
import connectionManager from '../../common/services/connection-manager';

const log: debug.IDebugger = debug('app:groups-middleware');
class GroupsMiddleware {

    async extractGroupId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.groupId;
        next();
    }
}

export default new GroupsMiddleware();
