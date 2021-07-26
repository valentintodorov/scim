import GroupsDao from '../daos/group.dao';
import { CreateGroupDto } from '../dto/create.group.dto';
import { PutGroupDto } from '../dto/put.group.dto';
import { PatchGroupDto } from '../dto/patch.group.dto';
import { CRUD } from '../../common/interfaces/crud.interface';
import { Connection } from 'mongoose';

class UsersService implements CRUD {
    async create(dbConnection: Connection, resource: CreateGroupDto) {
        return GroupsDao.addGroup(dbConnection, resource);
    }

    async deleteById(dbConnection: Connection, id: string) {
        return GroupsDao.removeGroupById(dbConnection, id);
    }

    async getUserByFilter(dbConnection: Connection, filter: any, queryProjection: string) {
        return GroupsDao.getGroupByFilter(dbConnection, filter, queryProjection);
    }

    async list(dbConnection: Connection, startIndex: number, count: number, queryProjection: string) {
        return GroupsDao.getGroups(dbConnection, startIndex, count, queryProjection);
    }

    async getTotalResults(dbConnection: Connection) {
        return GroupsDao.getTotalResults(dbConnection);
    }

    async patchById(dbConnection: Connection, id: string, resource: PatchGroupDto): Promise<any> {
        return GroupsDao.updateGroupById(dbConnection, id, resource);
    }

    async putById(dbConnection: Connection, id: string, resource: PutGroupDto): Promise<any> {
        return GroupsDao.updateGroupById(dbConnection, id, resource);
    }

    async readById(dbConnection: Connection, id: string, queryProjection: string) {
        return GroupsDao.getGroupById(dbConnection, id, queryProjection);
    }
    
    async getUserByExternalId(dbConnection: Connection, externalId: string) {
        return GroupsDao.getGroupByExternalId(dbConnection, externalId);
    }

}

export default new UsersService();