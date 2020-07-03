import express from 'express';
import racedayRoutes from './routes/racedayRoutes';

const server = express();
const router = express.Router();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('OK');
});

racedayRoutes(server);
server.use('/racedays', router);

export default server;
