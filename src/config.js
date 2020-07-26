import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  CORS_ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN,
  REDIS_URI: process.env.REDIS_URI,
};

if (process.env.NODE_ENV === 'test') {
  config.MONGODB_URI = process.env.MONGO_URL;
}

export default config;
