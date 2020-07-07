import dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_MONGO_URL: process.env.DB_MONGO_URL,
  DB_NAME: process.env.DB_NAME,
};

export default config;
