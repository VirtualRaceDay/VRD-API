import setupDb from './utils/setupdb';
import config from './config';

const { DB_MONGO_URL, DB_NAME } = config;

const db = setupDb(DB_MONGO_URL, DB_NAME);

export default db;
