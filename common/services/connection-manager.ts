import mongodb from './mongodb';
import debug from 'debug';

const log: debug.IDebugger = debug('app:connection-manager');

/**
 * Creating New MongoDb Connection obect by Switching DB
 */
const getTenantDB = (tenantId: string, modelName: string, schema: any) => {
  const dbName = `scim-db_${tenantId}`;
  if (mongodb) {
    // useDb will return new connection
    const db = mongodb.useDb(dbName, { useCache: true });
    log(`DB switched to ${dbName}`);
    db.model(modelName, schema);
    return db;
  }
  let dbError = `Mongoose connection error: ${dbName} with connection info ${JSON.stringify(process.env.MONGODB_URL)}`;
  log(dbError);
  throw new Error(dbError);
};

/**
 * Return Model as per tenant
 */
const getModelByTenant = (tenantId: string, modelName: string, schema: any) => {
  log(`getModelByTenant tenantId : ${tenantId}.`);
  const tenantDb = getTenantDB(tenantId, modelName, schema);
  return tenantDb.model(modelName);
};

const getTenantDbConnection = (tenantId: string) => {
  const dbName = `scim-db_${tenantId}`;
  // useDb will return new connection
  const db = mongodb.useDb(dbName, { useCache: true });
  return db;
}

const getLogsDbConnection = (dbName: string) => {
  // useDb will return new connection
  const db = mongodb.useDb(dbName, { useCache: true });
  return db;
}

export default {
  getTenantDbConnection,
  getTenantDB,
  getModelByTenant,
  getLogsDbConnection
};