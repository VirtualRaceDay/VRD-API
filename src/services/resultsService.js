import * as WagerService from './wagerService';
import * as RaceService from './raceService';

export const getResults = async (raceId) => {
  //get Race
  const race = await RaceService.getRaceById(raceId);

  // Get all bets for race where the winner was chosen
  const raceWagers = WagerService.getRaceWinningWagers(race);

  return raceWagers;
  // Calculate returns from bet

  // Update players balance

};



