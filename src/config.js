import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
};

export default config;
