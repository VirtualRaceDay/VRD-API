import RaceDay from '../models/racedayModel';

export const getRacedayById = async (req, res) => {
  const { pin } = req.params;

  const raceday = await RaceDay.find({ pin: pin }).exec();

  if (!raceday) {
    res.status(404).send();
  } else {
    res.send(raceday);
  }
};

export default getRacedayById;
