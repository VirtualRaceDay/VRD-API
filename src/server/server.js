import express from 'express';
import cors from 'cors';

import config from '../config';

import raceDayRoutes from '../routes/raceDayRoutes';
import versionRoute from '../routes/versionRoute';

const initialise = () => {
  const server = express();
  const router = express.Router();
  const corsMiddleware = cors({
    origin: config.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200, // just in case someone uses IE 11 to access the API!
  });

  server.use(corsMiddleware);
  server.use(express.json());

  server.get('/', (req, res) => {
    res.status(200).send('OK');
  });

  raceDayRoutes(server);
  versionRoute(server);

  server.use('/racedays', router);
  server.use('/version', router);

  return server;
};

export default { initialise };
