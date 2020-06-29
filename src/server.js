import express from 'express';
import racedayRoutes from './routes/racedayRoutes';

const server = express();

server.get('/', (req, res) => {
  res.status(200).send('OK');
});

server.use('/racedays', racedayRoutes);

export default server;
