import express from 'express';
import raceDayRoutes from './routes/raceDayRoutes';

const server = express();
const router = express.Router();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('OK');
});

raceDayRoutes(server);
server.use('/racedays', router);

export default server;
