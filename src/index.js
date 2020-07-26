import config from './config';
import logger from './logging';
import Server from './server/server';

const main = () => {
  const server = Server.initialise();

  const { PORT, HOSTNAME } = config;

  server.listen(PORT, HOSTNAME, () => {
    logger.info(`Server listening at http://${HOSTNAME}:${PORT}`);
  });
};

main();
