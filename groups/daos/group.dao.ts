import { CreateGroupDto } from '../dto/create.group.dto';
import { PatchGroupDto } from '../dto/patch.group.dto';
import { PutGroupDto } from '../dto/put.group.dto';


import {v4 as uuidv4} from 'uuid';
import debug from 'debug';
import { Connection } from 'mongoose';
import { IGroup, Group, GroupSchema } from './group-schema';
import { IUser, UserModel, UserSchema } from '../../users/daos/user-schema';

import { model, Schema, Model, Document, Types, ObjectId } from 'mongoose';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:groups-dao');

class GroupsDao {
    constructor() {
        log('Created new instance of GroupsDao');
    }

    async addGroup(dbConnection: Connection, groupFields: CreateGroupDto) {
        let currentDate = new Date();   
        groupFields.meta = groupFields.meta ?? {};
        //groupFields.meta.resourceType = 'Group';
        groupFields.meta.created = currentDate;
        groupFields.meta.lastModified = currentDate;

        if(groupFields.members) {
            (groupFields as any).members = groupFields.members.map(g => g.value);
        }

        let Groups = dbConnection.model('Groups', GroupSchema);
        let group = new Groups(groupFields);
        await group.save();
        return group.id;
    }

    async getTotalResults(dbConnection: Connection) {
        let Groups = dbConnection.model('Groups', GroupSchema);
        return Groups.countDocuments({});
    }


    async removeGroupById(dbConnection: Connection, groupId: string) {
        if (Types.ObjectId.isValid(groupId)) {
            const Groups = dbConnection.model('Groups', GroupSchema);
            return Groups.deleteOne({ _id: groupId }).exec();
        }
        return null;
    }

    async getGroupById(dbConnection: Connection, groupId: string, queryProjection = '') {
        if (Types.ObjectId.isValid(groupId)) {
            const Groups = dbConnection.model('Groups', GroupSchema);
            let group;
            group = await Groups.findOne({ _id: groupId }).select(queryProjection).exec();
            return group;
        }
        return null;
    }

    async getGroupByExternalId(dbConnection: Connection, externalId: string, queryProjection = '') {
        if (Types.ObjectId.isValid(externalId)) {
            const Groups = dbConnection.model('Groups', GroupSchema);
            let group;
            group = Groups.findOne({ externalId: externalId }).select(queryProjection).exec();
            return group;
        }
        return null;
    }

    async getGroupByFilter(dbConnection: Connection, filter: any, queryProjection = '') {
        let group;
        if(filter.hasOwnProperty('id')) {
            group = this.getGroupById(dbConnection, filter.id, queryProjection);
        } else {
            const Groups = dbConnection.model('Groups', GroupSchema);
            group = Groups.findOne(filter).select(queryProjection).exec();
        }
        return group;
    }

    async getGroups(dbConnection: Connection, startIndex = 1, count = 25, queryProjection = '') {
        const Groups = dbConnection.model('Groups', GroupSchema);
        if(startIndex <=0) {
            startIndex = 1;
        }

        log(`log parameters: startIndex: ${startIndex} , count: ${count}`);
            let groups = Groups.find()
            .select(queryProjection)
            .limit(count)
            .skip(--startIndex)
            .exec();
            
            return groups;
    }

    async updateGroupById(
        dbConnection: Connection,
        groupId: string,
        groupFields: PatchGroupDto | PutGroupDto
    ) {
        if (Types.ObjectId.isValid(groupId)) {
            let currentDate = new Date();
            //groupFields.meta = groupFields.meta ?? {};
            if(!!groupFields.meta) {
                groupFields.meta.lastModified = currentDate;
            }

            if(groupFields.members) {
                (groupFields as any).members = groupFields.members.map(g => g.value);
            }

            const Groups = dbConnection.model('Groups', GroupSchema);
            const existingUser = await Groups.findOneAndUpdate(
                { _id: groupId },
                { $set: groupFields },
                { new: true }
            ).exec();

            return existingUser;
        }
        return null;
    }

    async getGroupMembers (dbConnection: Connection, groupUsers: [string]) {
        let Users = dbConnection.model('Users', UserSchema);
        var users = Users.find({_id: {$in: groupUsers}})
        .select(' id displayName ')
        .exec();

        return users;
    }
}

export default new GroupsDao();