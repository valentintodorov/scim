import mongoose from 'mongoose';
import debug from 'debug';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();

const log: debug.IDebugger = debug('app:mongodb');

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connection = () => mongoose.createConnection(`${process.env.MONGODB_URL}/`, mongoOptions);

const connectToMongoDB = () => {
  const db = connection();
  db.on('open', () => {
    log(`Mongoose connection open to ${JSON.stringify(process.env.MONGODB_URL)}`);
  });
  db.on('error', (err) => {
    log(`Mongoose connection error: ${err} with connection info ${JSON.stringify(process.env.MONGODB_URL)}`);
    process.exit(0);
  });
  return db;
};


export default connectToMongoDB();