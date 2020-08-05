import RaceDay from '../models/raceDayModel';

export const createRaceDay = async (raceDay) => {
  const newRaceDay = new RaceDay(raceDay);
  await newRaceDay.save();
  return newRaceDay.id;
};

export const getAllRaceDays = () => RaceDay.find().exec();

export const getRaceDayById = (id) => RaceDay.findById(id).exec();

export const getRaceDayByPin = (pin) => RaceDay.findOne({ pin }).exec();

export const updateRaceDayById = (_id, newRaceDay) => RaceDay.updateOne({ _id }, newRaceDay).exec();

export const deleteRaceDayById = (_id) => RaceDay.deleteOne({ _id }).exec();

export const getLeaderboardForRace = async (raceDay) => {
  const populatedRace = await raceDay.populate('players', 'name currentFunds').execPopulate();
  return populatedRace.players;
};
