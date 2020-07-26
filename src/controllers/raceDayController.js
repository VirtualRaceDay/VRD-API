import * as RaceDayService from '../services/raceDayService';

const validateRaceDay = (raceDay) => (raceDay.name &&
  raceDay.pin &&
  raceDay.races &&
  raceDay.races.length &&
  raceDay.initialStake &&
  raceDay.maxPlayers);

const errorResponse = (res, message) => res.status(500).send({ code: 500, data: `Internal Server Error: ${message}`});
const notFoundResponse = (res) => res.status(404).send({ code: 400, data: 'Id not found'});
const okResponse = (res, data) => res.send({ code: 200, data });

export const createRaceDay = async (req, res) => {
  const { body } = req;

  if (!validateRaceDay(body)) {
    return res.status(400).send({ code: 400, data: { ...body }});
  }

  try {
    const id = await RaceDayService.createRaceDay(body);
    return res.status(201).send({ code: 201, data: { id }});
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const getAllRaceDays = async (req, res) => {
  try {
    const races = await RaceDayService.getAllRaceDays();
    return okResponse(res, races);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const getRaceDayById = async (res, req) => {
  const { id } = req.params;

  if (!id) {
    return notFoundResponse(res);
  }

  try {
    const race = await RaceDayService.getRaceDayById(id);
    if (race._id) {
      return okResponse(res, race);
    }
    return notFoundResponse(res);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const updateRaceDay = async (res, req) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    return notFoundResponse(res);
  }

  if (!validateRaceDay(body)) {
    return res.status(400).send({ code: 400, data: { ...body }});
  }

  try {
    await RaceDayService.updateRaceDayById(id, body);
    return okResponse(res, { id, ...body });
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

export const deleteRaceDay = async (res, req) => {
  const { id } = req.params;

  if (!id) {
    return notFoundResponse(res);
  }

  try {
    await RaceDayService.deleteRaceDayById(id);
    return okResponse(res, { id });
  } catch (e) {
    return errorResponse(res, e.message);
  }
};
