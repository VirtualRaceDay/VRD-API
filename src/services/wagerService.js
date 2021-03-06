import Wager from '../models/wagerModel';
import Player from '../models/playerModel';

export const createWager = async (wager) => new Wager(wager);

export const addWagerToPlayer = async (player, wager) => {
  await wager.save();
  player.wagers.addToSet(wager._id);
  player.currentFunds -= wager.amount;

  await player.save();
  return;
};

export const updateWager = async (currentWager, updateWager) => {
  //We should only be able to update the horse number and amount
  currentWager.horseNumber = updateWager.horseNumber;
  currentWager.amount = updateWager.amount;

  await currentWager.save();
  return;
};

export const getPlayerRaceWagers = async (player, race) => {
  const playerWagers = await player.populate({
    path: 'wagers',
    select: '_id race amount horseNumber',
    match: { race }
  }).execPopulate();

  return playerWagers.wagers;
};

export const getRaceWinningWagers = async (race) => {
  const wagers = await Wager.find({ race: race._id });

  const winningHorse = race.horses.find((horse) => {
    return horse.winner = true;
  });

  let winningWagers = wagers.filter((wager) => {
    return wager.horseNumber == winningHorse.number;
  });

  const wagersWithWinnings = winningWagers.map((wager) => {
    const winnings = ((wager.amount) * winningHorse.odds) + wager.amount;

    return { wager, winnings };
  });

  return wagersWithWinnings;
};

export const getWagerById = async (id) => {
  return await Wager.findById(id).exec();
};

export const removeWager = async (player, wager) => {
  player.currentFunds += wager.amount;

  const id = wager._id;
  await Wager.deleteOne({ _id: id }).exec();
  await Player.updateOne({ _id: player._id }, { $pull: { wagers: id } });
  return;
};
