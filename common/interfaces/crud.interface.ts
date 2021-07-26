import { Connection } from 'mongoose';

export interface CRUD {
    list: (dbConnection: Connection, startIndex: number, count: number, queryProjection: string) => Promise<any>;
    create: (dbConnection: Connection, resource: any) => Promise<any>;
    putById: (dbConnection: Connection, id: string, resource: any) => Promise<string>;
    readById: (dbConnection: Connection, id: string, queryProjection: string) => Promise<any>;
    deleteById: (dbConnection: Connection, id: string) => Promise<any>;
    patchById: (dbConnection: Connection, id: string, resource: any) => Promise<string>;
}