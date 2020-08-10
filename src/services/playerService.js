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
  await player.save();
  raceDay.players.addToSet(player._id);
  await raceDay.save();
  return player.id;
};

export const getPlayerById = async (id) => {
  return await Player.findById(id).exec();
};
