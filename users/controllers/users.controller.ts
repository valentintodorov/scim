import express from 'express';
import debug from 'debug';
import usersService from '../services/users.service';
import ScimError, { HttpStatusCode } from '../../common/scim-error';
import ScimCollection from '../../common/scim-schemas/scim-collection';

import connectionManager from '../../common/services/connection-manager';
import groupsService from '../../groups/services/groups.service';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
    async listUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            let attributes = '';
            let arrAttr: string[] = [];
            if (req.query.attributes) {
                arrAttr = (req.query.attributes as string).split(',');
                attributes = arrAttr.map(item => item.trim()).join(' ')
                attributes += ' schemas id externalId groups ' // mandatory return attributes
            } else {
                attributes += 'schemas id externalId groups ';
                attributes += 'userName name.givenName name.middleName name.familyName name.formatted ';
                attributes += 'name.honorificPrefix name.honorificSuffix active ';
                attributes += 'locale preferredLanguage userType title displayName timezone nickName profileUrl entitlements roles x509Certificates.value ';
                attributes += 'addresses.type addresses.streetAddress addresses.locality addresses.region addresses.postalCode addresses.country addresses.formatted addresses.primary ';
                attributes += 'emails.value emails.type emails.primary ';
                attributes += 'phoneNumbers.value phoneNumbers.type ';
                attributes += 'photos.value photos.type   ';
                attributes += 'ims.value ims.type   ';
                attributes += 'meta.location meta.version meta.lastModified meta.created ';
            }

            let excludedAttributes = '';
            //let excludedAttributes = '  -entitlements._id -emails._id -phoneNumbers._id -photos.id -roles-_id'
            if (req.query.excludedAttributes) {
                excludedAttributes += (req.query.excludedAttributes as string).split(',').map(item => item.trim()).join(' -')
            }

            let queryProjection = attributes + ' ' + excludedAttributes;

            if (req.query.filter) {
                // GET /Users?filter=userName eq "bjensen"&attributes=ims,locale,name.givenName,externalId,preferredLanguage,userType,id,title,timezone,name.middleName,name.familyName,nickName,name.formatted,meta.location,userName,name.honorificSuffix,meta.version,meta.lastModified,meta.created,name.honorificPrefix,emails,phoneNumbers,photos,x509Certificates.value,profileUrl,roles,active,addresses,displayName,entitlements
                //
                // Get user request before/after updating a user:
                // GET = /Users?filter=userName eq "jsmith"&attributes=id,userName
                //
                // Get user request for retreving all attributes:
                // GET = /Users?filter=userName eq "jsmith"&attributes=ims,locale,name.givenName,externalId,preferredLanguage,userType,id,title,timezone,name.middleName,name.familyName,nickName,name.formatted,meta.location,userName,name.honorificSuffix,meta.version,meta.lastModified,meta.created,name.honorificPrefix,emails,phoneNumbers,photos,x509Certificates.value,profileUrl,roles,active,addresses,displayName,entitlements

                const filter = req.query.filter.toString();
                const arrFilter = filter.split(' ');// userName eq "bjensen"
                if (arrFilter.length > 2 && arrFilter[1] === 'eq') {
                    let identifier = decodeURIComponent(filter.substring(filter.indexOf('"')).replace(/"/g, '')) // bjensen / UserGroup-1
                    let getObj: any = {};
                    getObj[arrFilter[0]] = identifier;  // e.g. userName

                    try {
                        const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);

                        let user = await usersService.getUserByFilter(dbConnection, getObj, queryProjection);
                        if(user) {
                            // move out
                            const location = `${req.protocol}://${req.hostname}`;
                            let userJson: any = user.toJSON();
                            userJson.meta = userJson.meta ?? {};
                            userJson.meta.location = `${location}/Users/${user.id}`;
                            //userJson.meta.resourceType = 'User';
                            // move out
                            if (!req.query.attributes || arrAttr.includes('groups')) { // include groups
                                let groups = await usersService.getUserGroups(dbConnection, (user as any).groups);
                                if(groups) {
                                    let groupsJson = groups.map((item: any)  => {
                                        const el: any = {};
                                        el.value = item.id;
                                        if(item.displayName) {
                                            el.display = item.displayName;
                                        }
                                        el.$ref = `${location}/Groups/${item.id}`;
                                        el.type = 'direct';
                                        return el;
                                    });
                                    userJson.groups = groupsJson;
                                }
                            }
                            res.status(200).send(userJson);
                        } else {
                            next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `User ${req.params.userId} not found`, true));
                        }
                    } catch(err) {
                        next(err);
                    }
                } else {
                    next(new ScimError(`Error`, HttpStatusCode.BAD_REQUEST, `GET /Users having incorrect filter query syntax - only supporting eq - example: ?filter=userName eq "bjensen"`, true));
                }
            } else {
                try {
                    let count = req.query.count ? parseInt(<string>req.query.count) : 200;
                    let startIndex = req.query.startIndex ? parseInt(<string>req.query.startIndex) : 1;
                    const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);

                    let users = await usersService.list(dbConnection, startIndex, count, queryProjection);
                    let totalResults = await usersService.getTotalResults(dbConnection);

                    let usersJson: any = [];
                    if(users && Array.isArray(users) && users.length > 0) {
                        for (let j = 0; j < users.length; j++) {
                            let user: any = users[j];

                            // move out
                            const location = `${req.protocol}://${req.hostname}`;
                            let userJson: any = user.toJSON();
                            userJson.meta = userJson.meta ?? {};
                            userJson.meta.location = `${location}/Users/${user.id}`;
                            //userJson.meta.resourceType = 'User';
                            // move out
                            if (!req.query.attributes || arrAttr.includes('groups')) { // include groups
                                if(user.groups && Array.isArray(user.groups) && user.groups.length > 0) {
                                    let groups = await usersService.getUserGroups(dbConnection, (user as any).groups);
                                    if(groups) {
                                        let groupsJson = groups.map((item: any)  => {
                                            const el: any = {};
                                            el.value = item.id;
                                            if(item.displayName) {
                                                el.display = item.displayName;
                                            }
                                            el.$ref = `${location}/Groups/${item.id}`;
                                            el.type = 'direct';
                                            return el;
                                        });
                                        userJson.groups = groupsJson;
                                    }
                                }
                            }
                            // end move out
                            usersJson.push(userJson);
                        }
                    }

                    let scimResponse = ScimCollection.jsonResponse(usersJson, startIndex, totalResults);
                    res.status(200).send(scimResponse);
                  } catch(err) {
                    next(err);
                  }
            }
        } catch(err) {
            next(err);
        }
    }

    async getUserById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);

            let attributes = '';
            let arrAttr: string[] = [];
            if (req.query.attributes) {
                arrAttr = (req.query.attributes as string).split(',');
                attributes = arrAttr.map(item => item.trim()).join(' ')
                attributes += ' schemas id externalId groups ' // mandatory return attributes
            } else {
                attributes += 'schemas id externalId groups ';
                attributes += 'userName name.givenName name.middleName name.familyName name.formatted ';
                attributes += 'name.honorificPrefix name.honorificSuffix active ';
                attributes += 'locale preferredLanguage userType title displayName timezone nickName profileUrl entitlements roles x509Certificates.value ';
                attributes += 'addresses.type addresses.streetAddress addresses.locality addresses.region addresses.postalCode addresses.country addresses.formatted addresses.primary ';
                attributes += 'emails.value emails.type emails.primary ';
                attributes += 'phoneNumbers.value phoneNumbers.type ';
                attributes += 'photos.value photos.type   ';
                attributes += 'ims.value ims.type   ';
                attributes += 'meta.location meta.version meta.lastModified meta.created ';
            }

            let user: any = await usersService.readById(dbConnection, req.body.id, attributes);
            if(user) {
                // move out
                const location = `${req.protocol}://${req.hostname}`;
                let userJson: any = user.toJSON();
                userJson.meta = userJson.meta ?? {};
                userJson.meta.location = `${location}/Users/${user.id}`;
                //userJson.meta.resourceType = 'User';
                // move out
                if (!req.query.attributes || arrAttr.includes('groups')) { // include groups
                    if(user.groups && Array.isArray(user.groups) && user.groups.length > 0) {
                        let groups = await usersService.getUserGroups(dbConnection, (user as any).groups);
                        if(groups) {
                            let groupsJson = groups.map((item: any)  => {
                                const el: any = {};
                                el.value = item.id;
                                if(item.displayName) {
                                    el.display = item.displayName;
                                }
                                el.$ref = `${location}/Groups/${item.id}`;
                                el.type = 'direct';
                                return el;
                            });
                            userJson.groups = groupsJson;
                        }
                    }
                }
                // end move out
                res.status(200).send(userJson);
            } else {
                next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `User ${req.params.userId} not found`, true));
            }
        } catch(err) {
            next(err);
        }
    }

    async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            
            const userId = await usersService.create(dbConnection, req.body);
            let user: any = await usersService.readById(dbConnection, userId, '');
            if(user) {
                let arrAttr: string[] = [];

                // move out
                const location = `${req.protocol}://${req.hostname}`;
                let userJson: any = user.toJSON();
                userJson.meta = userJson.meta ?? {};
                userJson.meta.location = `${location}/Users/${user.id}`;
                //userJson.meta.resourceType = 'User';
                // move out
                if (!req.query.attributes || arrAttr.includes('groups')) { // include groups
                    if(user.groups && Array.isArray(user.groups) && user.groups.length > 0) {
                        let groups = await usersService.getUserGroups(dbConnection, (user as any).groups);
                        if(groups) {
                            let groupsJson = groups.map((item: any)  => {
                                const el: any = {};
                                el.value = item.id;
                                if(item.displayName) {
                                    el.display = item.displayName;
                                }
                                el.$ref = `${location}/Groups/${item.id}`;
                                el.type = 'direct';
                                return el;
                            });
                            userJson.groups = groupsJson;
                        }
                    }
                }
                // end move out
                res.status(201).send(userJson);
            } else {
                next(new ScimError(`Error`, HttpStatusCode.NOT_FOUND, `User ${req.params.userId} not found`, true));
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
            log(await usersService.patchById(dbConnection, req.body.id, req.body));
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
            log(await usersService.putById(dbConnection, req.body.id, req.body));
            let user = await usersService.readById(dbConnection, req.body.id, '');
            res.status(200).send(user?.toJSON());
        } catch(err) {
            next(err);
        }
    }

    async removeUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            const dbConnection = connectionManager.getTenantDbConnection((req as any).tenantId);
            log(req.url);
            log(req.body);
            log(await usersService.deleteById(dbConnection, req.body.id));
            res.status(204).send();
        } catch(err) {
            next(err);
        }
    }
}

export default new UsersController();