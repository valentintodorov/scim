import express from 'express';
import debug from 'debug';
import groupsService from '../services/groups.service';
import ScimError, { HttpStatusCode } from '../../common/scim-error';
import ScimCollection from '../../common/scim-schemas/scim-collection';

import connectionManager from '../../common/services/connection-manager';

const log: debug.IDebugger = debug('app:users-controller');
class GroupsController {
    async listGroups(req: express.Request, res: express.Response, next: express.NextFunction) {
        var emptyResponse = {
            itemsPerPage: 0,
            totalResults: 0,
            startIndex: 1,
            schemas: [
              'urn:ietf:params:scim:api:messages:2.0:ListResponse'
            ],
            Resources: []
          };
        res.status(200).send(emptyResponse);
    }

    async getGroupById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);

            let attributes = 'schemas id externalId ';
            attributes += 'displayName members.value members.$ref members.type ';
            attributes += 'meta.location meta.version meta.lastModified meta.created ';

            let group: any = await groupsService.readById(dbConnection, req.body.id, attributes);
            if(group) {
                const location = `${req.protocol}://${req.hostname}`;
                let groupJson: any = group.toJSON();
                groupJson.meta = groupJson.meta ?? {};
                groupJson.meta.location = `${location}/Groups/${group.id}`;
                groupJson.meta.resourceType = 'Group';

                // todo:return members

                res.status(200).send(groupJson);
            } else {
                next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `Group ${req.params.groupId} not found`, true));
            }
        } catch(err) {
            next(err);
        }
    }

    async createGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            
            const groupId = await groupsService.create(dbConnection, req.body);
            let group = await groupsService.readById(dbConnection, groupId, '');
            res.status(201).send(group?.toJSON());
        } catch(err) {
            next(err);
        }
    }

    async patch(req: express.Request, res: express.Response, next: express.NextFunction) {
        next(new ScimError(`Error`, HttpStatusCode.NOT_IMPLEMENTED, 'Not Implemented', true));
    }

    async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        next(new ScimError(`Error`, HttpStatusCode.NOT_IMPLEMENTED, 'Not Implemented', true));
    }

    async removeGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
        next(new ScimError(`Error`, HttpStatusCode.NOT_IMPLEMENTED, 'Not Implemented', true));
    }
}

export default new GroupsController();