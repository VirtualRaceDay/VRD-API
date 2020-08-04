import RaceDay from '../models/raceDayModel';

export const createRaceDay = async (raceDay) => {
  const newRaceday = new RaceDay(raceDay);
  await newRaceday.save();
  return newRaceday.id;
};

export const getAllRaceDays = () => RaceDay.find().exec();

export const getRaceDayById = (id) => RaceDay.findById(id).exec();

export const getRaceDayByPin = (pin) => RaceDay.findOne({ pin }).exec();

export const updateRaceDayById = (_id, newRaceDay) => RaceDay.updateOne({ _id }, newRaceDay).exec();

export const deleteRaceDayById = (_id) => RaceDay.deleteOne({ _id }).exec();
