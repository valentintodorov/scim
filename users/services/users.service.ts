import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { CRUD } from '../../common/interfaces/crud.interface';
import { Connection } from 'mongoose';

class UsersService implements CRUD {
    async create(dbConnection: Connection, resource: CreateUserDto) {
        return UsersDao.addUser(dbConnection, resource);
    }

    async deleteById(dbConnection: Connection, id: string) {
        return UsersDao.removeUserById(dbConnection, id);
    }

    async getUserByFilter(dbConnection: Connection, filter: any, queryProjection: string) {
        return UsersDao.getUserByFilter(dbConnection, filter, queryProjection);
    }

    async list(dbConnection: Connection, startIndex: number, count: number, queryProjection: string) {
        return UsersDao.getUsers(dbConnection, startIndex, count, queryProjection);
    }

    async getTotalResults(dbConnection: Connection) {
        return UsersDao.getTotalResults(dbConnection);
    }

    async patchById(dbConnection: Connection, id: string, resource: PatchUserDto): Promise<any> {
        return UsersDao.updateUserById(dbConnection, id, resource);
    }

    async putById(dbConnection: Connection, id: string, resource: PutUserDto): Promise<any> {
        return UsersDao.updateUserById(dbConnection, id, resource);
    }

    async readById(dbConnection: Connection, id: string, queryProjection: string) {
        return UsersDao.getUserById(dbConnection, id, queryProjection);
    }
    
    async getUserByUserName(dbConnection: Connection, userName: string) {
        return UsersDao.getUserByUserName(dbConnection, userName);
    }
    
    async getUserByExternalId(dbConnection: Connection, externalId: string) {
        return UsersDao.getUserByExternalId(dbConnection, externalId);
    }

    async getUserByEmail(dbConnection: Connection, email: string) {
        return UsersDao.getUserByEmail(dbConnection, email);
    }

    async getUserGroups(dbConnection: Connection, userGroups: [string]) {
        return UsersDao.getUserGroups(dbConnection, userGroups);
    }
}

export default new UsersService();