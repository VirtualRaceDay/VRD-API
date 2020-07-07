import setupDb from './utils/setupdb';
import config from './config';

const { MONGO_URI, DB_NAME } = config;

const db = setupDb(MONGO_URI, DB_NAME);

export default db;
