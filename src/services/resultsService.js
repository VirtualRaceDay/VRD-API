import * as WagerService from './wagerService';
import * as RaceService from './raceService';
import * as PlayerService from './playerService';

export const updateResults = async (raceId) => {
  //get Race
  const race = await RaceService.getRaceById(raceId);

  // Get all bets for race where the winner was chosen
  const winningWagers = await WagerService.getRaceWinningWagers(race);

  // Update players balance
  for (let i = 0; i < winningWagers.length; i++) {
    const winningWager = winningWagers[i];
    const wager = winningWager.wager;
    const player = await PlayerService.getPlayerById(wager.player.toString());

    player.currentFunds += winningWager.winnings;
    player.save();
  }

  return;
};



