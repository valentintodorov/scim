import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const env = process.env.NODE_ENV || "development";
const appConfig: {MONGODB_URL: string, PORT: string} = require(`./${env}`).default;

export default appConfig;