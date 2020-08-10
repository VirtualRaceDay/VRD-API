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
    return ResponseError.internalServerRequestError(`getWagerById: ${e.message}`);
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
    return ResponseError.internalServerRequestError(`getWagers: ${e.message}`, res);
  }
};

// Not currently in use as we are using the bullk insert function instead
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

export const createWagersBulk = async (req, res) => {
  const { body } = req;

  try {
    if (!body)
      return ResponseError.badRequestError(`createWagersBulk: invalid wagers payload from ${req.ip}`, res, body);

    const { wagers, player } = body;

    if (!wagers || !player)
      return ResponseError.badRequestError(`createWagersBulk: invalid wagers, raceId or playerId from ${req.ip}`, res, body);

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer)
      return ResponseError.notFoundRequestError(`createWager: player not found for id: ${player}`);

    const wagersToAdd = wagers.map(wager => {
      if (!wager.horseNumber || !wager.amount)
        throw new Error(`Invalid wager inputs values for horse ${wager.horseNumber} and amount ${wager.amount}`);

      wager.player = player;

      return wager;
    });

    let newWagers = [];

    for (let i = 0; i < wagersToAdd.length; i++) {
      const newWager = await WagerService.createWager(wagersToAdd[i]);
      await WagerService.addWagerToPlayer(foundPlayer, newWager);

      newWagers.push(newWager);
    }

    return Response.ok(res, { wagers: newWagers });
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`createWagersBulk: ${e.message}`, res);
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

    return Response.updated(res, foundWager);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`updateWager: ${e.message}`, res);
  }
};

export const deleteWager = async (req, res) => {
  const { body } = req;
  const { player } = body;
  const { id } = req.params;

  try {
    if (!id || !player)
      return ResponseError.badRequestError(`deleteWager: invalid wager payload from ${req.ip}`, res, { body, id });

    const foundPlayer = await PlayerService.getPlayerById(player);

    if (!foundPlayer)
      return ResponseError.notFoundRequestError(`deleteWager: player not found for id: ${player}`, res, { body, id });


    await WagerService.deleteWager(foundPlayer, id);

    return Response.deleted(res, { id });
  } catch (e) {
    return ResponseError(`deleteWager: ${e.message}`, res);
  }
};
