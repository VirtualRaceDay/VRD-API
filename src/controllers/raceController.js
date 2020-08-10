import * as Response from '../utils/responseUtils';
import * as ResponseError from '../utils/responseErrorUtils';
import * as RaceDayService from '../services/raceDayService';
import * as RaceService from '../services/raceService';

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
