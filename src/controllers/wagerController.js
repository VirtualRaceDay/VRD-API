import * as ResponseError from '../utils/responseErrorUtils';
import * as Response from '../utils/responseUtils';
import * as WagerService from '../services/wagerService';
import * as PlayerService from '../services/playerService';

const validateWager = (wager) => (wager &&
  wager.player &&
  wager.race &&
  wager.horseNumber &&
  wager.amount);

export const getWagerById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return ResponseError.badRequestError('getWagerById: wager id not specified', res, res.params);

    const wager = await WagerService.getWagerById(id);

    if (!wager)
      return ResponseError.notFoundRequestError(`getWagerById: wager not for for id ${id}`, res, res.params);

    return Response.ok(res, { wager });
  }
  catch (e) {
    return Response.internalServerRequestError(`getWagerById: ${e.message}`);
  }
};

export const getWagers = async (req, res) => {
  const { body } = req;
  const { player, race } = body;

  try {
    if (!player || !race)
      return ResponseError.badRequestError(`getWagers: invalid wager payload from ${req.ip}`, res, body);

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer)
      return ResponseError.notFoundRequestError('getWagers: player not found', res, body);

    const wagers = await WagerService.getRaceWagers(foundPlayer, race);

    return Response.ok(res, { wagers });
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`getWagers: ${e.message}`);
  }
};

export const createWager = async (req, res) => {
  const { body } = req;
  const { player } = body;

  try {
    if (!validateWager(body))
      return ResponseError.badRequestError(`createWager: invalid wager payload from ${req.ip}`, res, body);

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer)
      return ResponseError.notFoundRequestError(`createWager: player not found for id: ${player}`);

    const wager = await WagerService.createWager(body);
    await WagerService.addWagerToPlayer(foundPlayer, wager);

    return Response.created(res, { id: wager.id });
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`createWager: ${e.message}`);
  }
};

// This endpoint may not be used currently but is here for completness of the API and for future functionality 
export const updateWager = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    if (!id)
      return ResponseError.badRequestError('updateWager: wager id not specified', res, { body, id });

    const foundWager = await WagerService.getWagerById(id);

    if (!foundWager)
      return ResponseError.notFoundRequestError(`updateWager: wager not for id: ${id}`, res, { body, id });

    // Check that the race is the same
    if (foundWager.race.toString() !== body.race)
      return ResponseError.badRequestError('updateWager: race mismatch', res, { body, id });

    WagerService.updateWager(foundWager, body);

    return Response.updated(res);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`updateWager: ${e.message}`, res);
  }
};

export const deleteWager = async (req, res) => {
  const { body } = req;
  const { wager, player } = body;

  try {
    if (!wager || !player)
      return ResponseError.badRequestError(`deleteWager: invalid wager payload from ${req.ip}`, res, body);

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer)
      return ResponseError.notFoundRequestError(`deleteWager: player not found for id: ${player}`, res, body);


    await WagerService.deleteWager(foundPlayer, wager);
    return Response.deleted(res, { id: wager });
  } catch (e) {
    return ResponseError(`deleteWager: ${e.message}`, res);
  }
};
