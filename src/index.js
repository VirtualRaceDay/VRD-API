import config from './config';
import logger from './logging';
import routes from './routes';
import Server from './server/server';
import WebSocketServer from './server/webSocketServer';

const main = () => {
  const { PORT, HOSTNAME } = config;
  const server = Server.initialise();
  server.use('/', routes);

  const listener = server.listen(PORT, HOSTNAME, () => {
    logger.info(`Server listening at http://${HOSTNAME}:${PORT}`);
  });
  WebSocketServer.initialise(listener);
};

main();
