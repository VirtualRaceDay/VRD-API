import Wager from '../models/wagerModel';

export const createWager = async (wager) => new Wager(wager);

export const addWagerToPlayer = async (player, wager) => {
  await wager.save();
  player.wagers.addToSet(wager._id);

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

export const deleteWager = async (player, wagerId) => {
  await player.wagers.pull({ _id: wagerId });
  await player.save();

  await Wager.deleteOne({ _id: wagerId }).exec();
  return;
};

export const getRaceWagers = async (player, race) => {
  //const wagers = [];
  const playerWagers = await player.populate({
    path: 'wagers',
    select: '_id race amount horseNumber',
    match: { race }
  }).execPopulate();

  return playerWagers.wagers;
};

export const getWagerById = async (id) => {
  return await Wager.findById(id).exec();
};
