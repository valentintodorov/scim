import { CommonRoutesConfig } from '../common/common.routes.config';
import GroupsController from './controllers/groups.controller';
import GroupsMiddleware from './middleware/groups.middleware';
import express from 'express';

export class GroupsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'GroupsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/groups`)
            .get(GroupsController.listGroups)
            .post(
                GroupsController.createGroup
            );

        this.app.param(`groupId`, GroupsMiddleware.extractGroupId);
        this.app
            .route(`/groups/:groupId`)
            .get(GroupsController.getGroupById)
            .delete(GroupsController.removeGroup);

        this.app.put(`/groups/:groupId`, [
            GroupsController.put,
        ]);

        this.app.patch(`/groups/:groupId`, [
            GroupsController.patch,
        ]);

        return this.app;
    }
}