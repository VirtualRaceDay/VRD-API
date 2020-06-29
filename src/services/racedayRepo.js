import RaceDay from '../models/racedayModel';

export const getRacedayById = (id) => RaceDay.findById(id).exec();

export const getAllRacedays = () => RaceDay.find().exec();
