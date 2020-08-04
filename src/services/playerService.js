import Player from '../models/playerModel';

export const createPlayer = (name, startingFunds) => new Player({
  name,
  startingFunds,
  currentFunds: startingFunds,
  wagers: [],
});

export const addPlayerToRace = async (player, raceDay) => {
  raceDay.players.addToSet(player);
  await raceDay.save();
  return player['_id'].toHexString();
};
