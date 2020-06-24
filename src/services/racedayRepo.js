import RaceDay from '../models/racedayModel';

export const getRacedayById = (id) => RaceDay.findById(id).exec();

export const getAllRacedays = () => {
  return RaceDay.find().exec();
};
