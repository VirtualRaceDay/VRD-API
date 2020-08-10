import * as Response from '../utils/responseUtils';
import * as ResponseError from '../utils/responseErrorUtils';
import * as RaceDayService from '../services/raceDayService';
import * as RaceService from '../services/raceService';
import EventStatusPubSub from '../pub-sub/eventState';

const validateRace = (race) => (
  race.name &&
  race.link &&
  race.horses &&
  race.horses.length
);

export const createRace = async (req, res) => {
  const { body } = req;
  const { race, raceDayId } = body;

  try {
    if (!validateRace(race))
      return ResponseError.badRequestError(`createRace: Invalid race payload from ${req.ip}}`, res, body);

    if (!raceDayId)
      return ResponseError.badRequestError('createRace: Race day id must be speicified', res, body);

    const raceDay = await RaceDayService.getRaceDayById(raceDayId);

    if (!raceDay)
      return ResponseError.notFoundRequestError(`createRace: Race day not for with id ${raceDayId}`, res, body);

    const newRace = await RaceService.createRace(race);
    RaceService.addRaceToRaceCard(raceDay, newRace);


    return Response.ok(res, newRace);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`createRace: ${e}`, res);
  }
};
export const startRace = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return ResponseError.badRequestError(`startRace: bad payload for race from ${req.ip}`, res, req.params);

    RaceService.updateRaceState(id, 'started');
    EventStatusPubSub.publish('started');
    return Response.noContent(res, null);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`startRace: ${e.message}`, res);
  }
};

export const finishRace = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return ResponseError.badRequestError(`finishRace: bad payload for race from ${req.ip}`, res, req.params);

    RaceService.updateRaceState(id, 'finished');
    EventStatusPubSub.publish('finished');
    return Response.noContent(res, null);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`finishRace: ${e.message}`, res);
  }
};
