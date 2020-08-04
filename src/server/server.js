import express from 'express';
import cors from 'cors';

import config from '../config';

const initialise = () => {
  const server = express();

  const corsMiddleware = cors({
    origin: config.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200, // just in case someone uses IE 11 to access the API!
  });

  server.use(corsMiddleware);
  server.use(express.json());

  server.get('/', (req, res) => res.status(200).end('OK'));

  return server;
};

export default { initialise };
