import WebSocket from 'ws';
import logger from '../logging';
import PlayerListPubSub from '../pub-sub/playerList';

const playerListWSController = new WebSocket.Server({ noServer: true });

const broadcast = (channel, message) => {
  playerListWSController.clients.forEach((client) => {
    client.send(message);
  });
};

playerListWSController.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  logger.info(`connection from ${ip}`);

  // subscribe to player topic
  PlayerListPubSub.subscribe(broadcast);

  ws.on('close', () => {
    PlayerListPubSub.unsubscribe(broadcast);
    logger.info(`connection closed from ${ip}`);
  });
});

export default playerListWSController;
