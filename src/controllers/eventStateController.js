import WebSocket from 'ws';
import logger from '../logging';
import EventStatePubSub from '../pub-sub/eventState';

const eventStateWSController = new WebSocket.Server({ noServer: true });


const broadcast = (channel, message) => {
  eventStateWSController.clients.forEach((client) => {
    client.send(message);
  });
};

eventStateWSController.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  logger.info(`connection from ${ip}`);

  // subscribe to player topic
  EventStatePubSub.subscribe(broadcast);

  ws.on('close', () => {
    EventStatePubSub.unsubscribe(broadcast);
    logger.info(`connection closed from ${ip}`);
  });
});

export default eventStateWSController;
