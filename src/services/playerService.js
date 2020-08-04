import Player from '../models/playerModel';

export const createPlayer = (name, raceDay) => {
  const startingFunds = raceDay.get('initialStake');

  return new Player({
    name,
    startingFunds,
    currentFunds: startingFunds,
    wagers: [],
  });
};

export const addPlayerToRace = async (player, raceDay) => {
  raceDay.players.addToSet(player);
  await raceDay.save();
  return player.id;
};
