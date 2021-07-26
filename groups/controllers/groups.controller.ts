import express from 'express';
import debug from 'debug';
import groupsService from '../services/groups.service';
import ScimError, { HttpStatusCode } from '../../common/scim-error';
import ScimCollection from '../../common/scim-schemas/scim-collection';

import connectionManager from '../../common/services/connection-manager';

const log: debug.IDebugger = debug('app:users-controller');
class GroupsController {
    async listGroups(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let attributes = '';
            let arrAttr: string[] = [];
            attributes += 'schemas id externalId ';
            attributes += 'displayName members ';//members.value members.$ref members.type ';
            attributes += 'meta.location meta.version meta.lastModified meta.created ';

            let count = req.query.count ? parseInt(<string>req.query.count) : 200;
            let startIndex = req.query.startIndex ? parseInt(<string>req.query.startIndex) : 1;
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);

            let groups = await groupsService.list(dbConnection, startIndex, count, attributes);
            let totalResults = await groupsService.getTotalResults(dbConnection);

            let groupsJson: any = [];
            if(groups && Array.isArray(groups) && groups.length > 0) {
                for (let j = 0; j < groups.length; j++) {
                    let group: any = groups[j];

                    // move out
                    const location = `${req.protocol}://${req.hostname}`;
                    let groupJson: any = group.toJSON();
                    groupJson.meta = groupJson.meta ?? {};
                    groupJson.meta.location = `${location}/Groups/${group.id}`;
                    groupJson.meta.resourceType = 'Group';

                    if (!req.query.attributes || arrAttr.includes('members')) { // include members
                        if(group.members && Array.isArray(group.members) && group.members.length > 0) {
                            let members = await groupsService.getGroupMembers(dbConnection, (group as any).members);
                            if(members) {
                                let membersJson = members.map((item: any)  => {
                                    const el: any = {};
                                    el.value = item.id;
                                    el.$ref = `${location}/Users/${item.id}`;
                                    el.type = 'User';
                                    return el;
                                });
                                groupJson.members = membersJson;
                            }
                        }
                    }

                    groupsJson.push(groupJson);
                }
            }

            let scimResponse = ScimCollection.jsonResponse(groupsJson, startIndex, totalResults);
            res.status(200).send(scimResponse);
        } catch(err) {
            next(err);
        }
    }

    async getGroupById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            
            let attributes = '';
            let arrAttr: string[] = [];
            attributes += 'schemas id externalId ';
            attributes += 'displayName members ';//members.value members.$ref members.type ';
            attributes += 'meta.location meta.version meta.lastModified meta.created ';

            let group: any = await groupsService.readById(dbConnection, req.body.id, attributes);
            if (group) {
                const location = `${req.protocol}://${req.hostname}`;
                let groupJson: any = group.toJSON();
                groupJson.meta = groupJson.meta ?? {};
                groupJson.meta.location = `${location}/Groups/${group.id}`;
                groupJson.meta.resourceType = 'Group';

                if (!req.query.attributes || arrAttr.includes('members')) { // include members
                    if(group.members && Array.isArray(group.members) && group.members.length > 0) {
                        let members = await groupsService.getGroupMembers(dbConnection, (group as any).members);
                        if(members) {
                            let membersJson = members.map((item: any)  => {
                                const el: any = {};
                                el.value = item.id;
                                el.$ref = `${location}/Users/${item.id}`;
                                el.type = 'User';
                                return el;
                            });
                            groupJson.members = membersJson;
                        }
                    }
                }

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
            let group: any = await groupsService.readById(dbConnection, groupId, '');

            if (group) {
                let arrAttr: string[] = [];

                const location = `${req.protocol}://${req.hostname}`;
                let groupJson: any = group.toJSON();
                groupJson.meta = groupJson.meta ?? {};
                groupJson.meta.location = `${location}/Groups/${group.id}`;
                groupJson.meta.resourceType = 'Group';

                if (!req.query.attributes || arrAttr.includes('members')) { // include members
                    if(group.members && Array.isArray(group.members) && group.members.length > 0) {
                        let members = await groupsService.getGroupMembers(dbConnection, (group as any).members);
                        if(members) {
                            let membersJson = members.map((item: any)  => {
                                const el: any = {};
                                el.value = item.id;
                                el.$ref = `${location}/Users/${item.id}`;
                                el.type = 'User';
                                return el;
                            });
                            groupJson.members = membersJson;
                        }
                    }
                }

                res.status(201).send(groupJson);
            } else {
                next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `Group ${req.params.groupId} not found`, true));
            }
        } catch(err) {
            next(err);
        }
    }

    async patch(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            log(req.url);
            log(req.body);
            log(await groupsService.patchById(dbConnection, req.body.id, req.body));
            res.status(204).send();
        } catch(err) {
            next(err);
        }
    }

    async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            log(req.url);
            log(req.body);
            log(await groupsService.putById(dbConnection, req.body.id, req.body));
            let group = await groupsService.readById(dbConnection, req.body.id, '');
            res.status(200).send(group?.toJSON());
        } catch(err) {
            next(err);
        }
    }

    async removeGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            log(req.url);
            log(req.body);
            log(await groupsService.deleteById(dbConnection, req.body.id));
            res.status(204).send();
        } catch(err) {
            next(err);
        }
    }
}

export default new GroupsController();