import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

import {v4 as uuidv4} from 'uuid';
import debug from 'debug';
import { Connection } from 'mongoose';
import { IUser, UserModel, UserSchema } from './user-schema';
import { IGroup, Group, GroupSchema } from '../../groups/daos/group-schema';

import { model, Schema, Model, Document, Types, ObjectId } from 'mongoose';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(dbConnection: Connection, userFields: CreateUserDto) {
        let currentDate = new Date();   
        userFields.meta = userFields.meta ?? {};
        userFields.meta.resourceType = 'User';
        userFields.meta.created = currentDate;
        userFields.meta.lastModified = currentDate;
        //userFields.groups = userFields.groups.map(g=>(g as any).value.toString());

        let Users = dbConnection.model('Users', UserSchema);
        let user = new Users(userFields);
        await user.save();
        return user.id;
    }

    async getTotalResults(dbConnection: Connection): Promise<number> {
        //UserModel: Model<IUser> = model('User', UserSchema);
        let Users = dbConnection.model('Users', UserSchema);
        return await Users.countDocuments({}).exec();
    }

    async getUserByUserName(dbConnection: Connection, userName: string) {
        const Users = dbConnection.model('Users', UserSchema);
        const user = Users.findOne({ userName: userName }).exec();
        return user;
    }

    async getUserByExternalId(dbConnection: Connection, externalId: string) {
        const Users = dbConnection.model('Users', UserSchema);
        const user = Users.findOne({ externalId: externalId }).exec();
        return user;
    }

    async getUserByEmail(dbConnection: Connection, email: string) {
        const Users = dbConnection.model('Users', UserSchema);
        const user = Users.findOne({ email: email }).exec();
        return user;
    }

    async removeUserById(dbConnection: Connection, userId: string) {
        if (Types.ObjectId.isValid(userId)) {
            const Users = dbConnection.model('Users', UserSchema);
            return Users.deleteOne({ _id: userId }).exec();
        }
        return null;
    }

    async getUserById(dbConnection: Connection, userId: string, queryProjection = '') {
        if (Types.ObjectId.isValid(userId)) {
            const Users = dbConnection.model('Users', UserSchema);
            let user = Users.findOne({ _id: userId }).select(queryProjection).exec();

            return user;
        }
        return null;
    }

    async getUserByFilter(dbConnection: Connection, filter: any, queryProjection = '') {
        let user;
        if(filter.hasOwnProperty('id')) {
            user = this.getUserById(dbConnection, filter.id, queryProjection);
        } else {
            const Users = dbConnection.model('Users', UserSchema);
            user = Users.findOne(filter).select(queryProjection).exec();
        }

        return user;
    }

    async getUsers(dbConnection: Connection, startIndex = 1, count = 25, queryProjection = '') {
        const Users = dbConnection.model('Users', UserSchema);
        if(startIndex <=0) {
            startIndex = 1;
        }

        log(`log parameters: startIndex: ${startIndex} , count: ${count}`);
        let users = Users.find()
        .select(queryProjection)
        .limit(count)
        .skip(--startIndex)
        .exec();
        
        return users;
    }

    async updateUserById(
        dbConnection: Connection,
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ) {
        if (Types.ObjectId.isValid(userId)) {
            let currentDate = new Date();
            userFields.meta = userFields.meta ?? {};
            userFields.meta.lastModified = currentDate;

            const Users = dbConnection.model('Users', UserSchema);
            const existingUser = await Users.findOneAndUpdate(
                { _id: userId },
                { $set: userFields },
                { new: true }
            ).exec();

            return existingUser;
        }
        return null;
    }

    async getUserGroups(dbConnection: Connection, userGroups: [string]) {
        let Groups = dbConnection.model('Groups', GroupSchema);
        var groups = Groups.find({_id: {$in: userGroups}})
        .select(' id externalId displayName ')
        .exec();

        return groups;
    }

    async getGroupUsers() {
        return null;
    }
}

export default new UsersDao();