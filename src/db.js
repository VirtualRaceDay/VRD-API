import setupDb from './utils/setupdb';
import config from './config';

const { MONGO_URI } = config;

const db = setupDb(MONGO_URI);

export default db;
