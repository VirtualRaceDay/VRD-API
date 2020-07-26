import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  CORS_ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN,
};

export default config;
