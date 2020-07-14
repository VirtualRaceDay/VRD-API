import setupDb from './utils/setupdb';
import config from './config';

const { MONGODB_URI } = config;

const db = setupDb(MONGODB_URI);

export default db;
