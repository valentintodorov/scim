import { CommonRoutesConfig } from '../common/common.routes.config';
import DiscoveryController from './controllers/discovery.controller';
import express from 'express';

export class DiscoveryRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'DiscoveryRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/serviceProviderConfig`)
            .get(DiscoveryController.getServiceProviderConfig);

        this.app
            .route(`/schemas`)
            .get(DiscoveryController.getSchemas);

        this.app
            .route(`/resourcetypes`)
            .get(DiscoveryController.getResourcetypes);

        return this.app;
    }
}