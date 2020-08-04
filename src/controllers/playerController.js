import * as RaceDayService from '../services/raceDayService';
import * as PlayerService from '../services/playerService';

import * as Response from '../utils/responseUtils';
import logger from '../logging';

import PlayerListPubSub from '../pub-sub/playerList';

export const createNewPlayer = async (req, res) => {
  const { body } = req;
  
  try {
    const { pin, nickname } = body;

    if (!pin || !nickname) {
      logger.warn(`createNewPlayer: invalid player payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.badRequest(res, body);
    }
  
    const raceDay = await RaceDayService.getRaceDayByPin(pin);
    if (!raceDay) {
      logger.warn(`createNewPlayer: race for pin ${pin} not found`);
      return Response.notFound(res, 'No race for this pin');
    }

    const newPlayer = PlayerService.createPlayer(nickname, raceDay);
    const id = await PlayerService.addPlayerToRace(newPlayer, raceDay);
    PlayerListPubSub.publish(newPlayer);

    return Response.created(res, { playerId: id, raceDayId: raceDay.id });
  } catch (e) {
    logger.error(`createNewPlayer: ${e.message}`);
    return Response.error(res, e.message);
  }
};
