import express from 'express';
import raceDayRoutes from './routes/raceDayRoutes';
import versionRoute from './routes/versionRoute';

const server = express();
const router = express.Router();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('OK');
});

raceDayRoutes(server);
versionRoute(server);
server.use('/racedays', router);
server.use('/version', router);

export default server;
