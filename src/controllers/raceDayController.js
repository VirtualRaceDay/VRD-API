import logger from '../logging';
import * as Response from '../utils/responseUtils';
import * as RaceDayService from '../services/raceDayService';

const validateRaceDay = (raceDay) => (raceDay.name &&
  raceDay.pin &&
  raceDay.races &&
  raceDay.initialStake &&
  raceDay.maxPlayers);

export const createRaceDay = async (req, res) => {
  const { body } = req;

  try {
    if (!validateRaceDay(body)) {
      logger.warn(`createRaceDay: invalid raceDay payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.badRequest(res, body);
    }

    const id = await RaceDayService.createRaceDay(body);

    return Response.created(res, { id });
  } catch (e) {
    logger.error(`createRaceDay: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const getAllRaceDays = async (req, res) => {
  try {
    const races = await RaceDayService.getAllRaceDays();
    return Response.ok(res, races);
  } catch (e) {
    logger.error(`getAllRaceDays: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const getRaceDayById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      logger.warn(`getRaceDayById: no race id provided by ${req.ip}`);
      return Response.badRequest(res, 'Id not specified');
    }

    const race = await RaceDayService.getRaceDayById(id);

    if (!race) {
      logger.warn(`getRaceDayById: id '${id}' requested by ${req.ip} does not exist`);
      return Response.notFound(res, 'Id not found');
    }

    return Response.ok(res, race);
  } catch (e) {
    logger.error(`getRaceDayById: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const updateRaceDay = async (res, req) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    logger.warn(`updateRaceDayById: no race id provided by ${req.ip}`);
    return Response.notFound(res, 'Id not found');
  }

  try {
    if (!validateRaceDay(body)) {
      logger.warn(`updateRaceDayById: invalid raceDay payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return Response.badRequest(res, body);
    }

    await RaceDayService.updateRaceDayById(id, body);
    return Response.ok(res, { id, ...body });
  } catch (e) {
    logger.error(`updateRaceDayById: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const deleteRaceDayById = async (res, req) => {
  const { id } = req.params;

  if (!id) {
    logger.warn(`deleteRaceDayById: no race id provided by ${req.ip}`);
    return Response.notFound(res, 'Id not found');
  }

  try {
    await RaceDayService.deleteRaceDayById(id);
    return Response.ok(res, { id });
  } catch (e) {
    logger.error(`deleteRaceDayById: ${e.message}`);
    return Response.error(res, e.message);
  }
};

export const getLeaderboardForRace = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      logger.warn(`getLeaderboardForRace: no race id provided by ${req.ip}`);
      return Response.badRequest(res, 'Id not specified');
    }

    const raceDay = await RaceDayService.getRaceDayById(id);

    if (!raceDay) {
      logger.warn(`getLeaderboardForRace: id '${id}' requested by ${req.ip} does not exist`);
      return Response.notFound(res, 'Id not found');
    }

    const players = await RaceDayService.getLeaderboardForRace(raceDay);
    return Response.ok(res, { currency: raceDay.currency, players });
  } catch (e) {
    logger.error(`getLeaderboardForRace: ${e.message}`);
    return Response.error(res, e.message);
  }
};
