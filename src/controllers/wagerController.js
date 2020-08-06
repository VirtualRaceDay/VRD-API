import logger from '../logging';
import * as Response from '../utils/responseUtils';
import * as WagerService from '../services/wagerService';
import * as PlayerService from '../services/playerService';

const validateWager = (wager) => (wager &&
  wager.player &&
  wager.race &&
  wager.horseNumber &&
  wager.amount);

export const getWagers = async (req, res) => {
  const { body } = req;
  const { player, race } = body;

  try {

    if (!player || !race) {
      logger.warn(`getWagers: invalid wager payload from ${req.ip}`);
      logger.warn(JSON.stringify(req.params, null, 2));
      return Response.badRequest(res, req.params);
    }

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer) {
      logger.warn(`getWagers: player not found ${req.ip}`);
      logger.warn(JSON.stringify(req.params, null, 2));
      return Response.badRequest(res, req.params);
    }

    const wagers = await WagerService.getRaceWagers(foundPlayer, race);

    return Response.ok(res, { wagers });
  } catch (e) {
    logger.error(`getWagers: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const createWager = async (req, res) => {
  const { body } = req;
  const { player } = body;

  try {
    if (!validateWager(body)) {
      logger.warn(`createWager: invalid wager payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.badRequest(res, body);
    }

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer) {
      logger.warn(`createWager: player not found: ${player}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.notFound(res, body);
    }

    const wager = await WagerService.createWager(body);
    await WagerService.addWagerToPlayer(foundPlayer, wager);

    return Response.created(res, { id: wager.id });
  } catch (e) {
    logger.error(`createWager: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const deleteWager = async (req, res) => {
  const { body } = req;
  const { wager, player } = body;

  try {
    if (!wager || !player) {
      logger.warn(`deleteWager: invalid wager payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.badRequest(res, body);
    }

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer) {
      logger.warn(`deleteWager: player not found: ${player}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.notFound(res, body);
    }

    await WagerService.deleteWager(foundPlayer, wager);
    return Response.deleted(res, { id: wager });
  } catch (e) {
    logger.error(`deleteWager: ${e.message}`);
    return Response.error(res, e.message);
  }
};
