import url from 'url';
import logger from '../logging';
import routes from '../routes/webSocketRoutes';

const initialise = (server) => {
  server.on('upgrade', (req, sock, head) => {
    const pathname = url.parse(req.url).pathname;

    const routeHandler = routes.find((route) => route.path === pathname);
    if (routeHandler) {
      const handler = routeHandler.handler;
      handler.handleUpgrade(req, sock, head, (ws) => {
        handler.emit('connection', ws, req);
      });
    } else {
      sock.destroy();
    }
  });
  logger.info('Websocket listener initialised');
};

export default { initialise };
