import logger from '../logging';
import * as RaceDayService from '../services/raceDayService';

const validateRaceDay = (raceDay) => (raceDay.name &&
  raceDay.pin &&
  raceDay.races &&
  raceDay.races.length &&
  raceDay.initialStake &&
  raceDay.maxPlayers);

const errorResponse = (res, message) => res.status(500).send({ code: 500, data: `Internal Server Error: ${message}`});
const notFoundResponse = (res) => res.status(404).send({ code: 404, data: 'Id not found'});
const okResponse = (res, data) => res.send({ code: 200, data });

export const createRaceDay = async (req, res) => {
  const { body } = req;

  try {
    if (!validateRaceDay(body)) {
      logger.warn(`createRaceDay: invalid raceDay payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return res.status(400).send({ code: 400, data: { ...body }});
    }

    const id = await RaceDayService.createRaceDay(body);
    return res.status(201).send({ code: 201, data: { id }});
  } catch (e) {
    logger.error(`createRaceDay: ${e.message}`);
    return errorResponse(res, e.message);
  }
};

export const getAllRaceDays = async (req, res) => {
  try {
    const races = await RaceDayService.getAllRaceDays();
    return okResponse(res, races);
  } catch (e) {
    logger.error(`getAllRaceDays: ${e.message}`);
    return errorResponse(res, e.message);
  }
};

export const getRaceDayById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    logger.warn(`getRaceDayById: no race id provided by ${req.ip}`);
    return notFoundResponse(res);
  }

  try {
    const race = await RaceDayService.getRaceDayById(id);
    if (race._id) {
      return okResponse(res, race);
    }

    logger.warn(`getRaceDayById: id '${id}' requested by ${req.ip} does not exist`);
    return notFoundResponse(res);
  } catch (e) {
    logger.error(`getRaceDayById: ${e.message}`);
    return errorResponse(res, e.message);
  }
};

export const updateRaceDay = async (res, req) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    logger.warn(`updateRaceDayById: no race id provided by ${req.ip}`);
    return notFoundResponse(res);
  }

  try {
    if (!validateRaceDay(body)) {
      logger.warn(`updateRaceDayById: invalid raceDay payload from ${req.ip}`);
      logger.warn(JSON.stringify(body, null, 2));
      return res.status(400).send({ code: 400, data: { ...body }});
    }
  
    await RaceDayService.updateRaceDayById(id, body);
    return okResponse(res, { id, ...body });
  } catch (e) {
    logger.error(`updateRaceDayById: ${e.message}`);
    return errorResponse(res, e.message);
  }
};

export const deleteRaceDayById = async (res, req) => {
  const { id } = req.params;

  if (!id) {
    logger.warn(`deleteRaceDayById: no race id provided by ${req.ip}`);
    return notFoundResponse(res);
  }

  try {
    await RaceDayService.deleteRaceDayById(id);
    return okResponse(res, { id });
  } catch (e) {
    logger.error(`deleteRaceDayById: ${e.message}`);
    return errorResponse(res, e.message);
  }
};
