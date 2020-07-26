import config from './config';
import Server from './server';

const main = () => {
  const server = Server.initialise();

  const { PORT, HOSTNAME } = config;

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening at http://${HOSTNAME}:${PORT}`);
  });
};

main();
