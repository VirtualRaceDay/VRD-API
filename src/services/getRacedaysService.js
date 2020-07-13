import RaceDay from '../models/racedayModel';

export const getAllRacedays = async (req, res) => {
  const racedays = await RaceDay.find().exec();
  res.status(200).send(racedays);
};

export default getAllRacedays;
