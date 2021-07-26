import express from 'express';
import debug from 'debug';
import ScimError from '../../common/scim-schemas/scim-error-schema';
import ResourceType from '../../common/scim-schemas/scim-resource-type';
import Schemas from '../../common/scim-schemas/scim-schemas';
import ServiceProviderConfigs from '../../common/scim-schemas/scim-service-provider-configs';

const log: debug.IDebugger = debug('app:users-controller');
class DiscoveryController {
    async getServiceProviderConfig(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            res.status(200).send(ServiceProviderConfigs);
        } catch(err) {
            next(err);
        }
    }

    async getSchemas(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            res.status(200).send(Schemas);
        } catch(err) {
            next(err);
        }
    }

    async getResourcetypes(req: express.Request, res: express.Response, next: express.NextFunction) {
        try 
        {
            res.status(200).send(ResourceType);
        } catch(err) {
            next(err);
        }
    }
}

export default new DiscoveryController();