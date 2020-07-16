import RaceDay from '../models/racedayModel';

export const getRacedayById = async (req, res) => {
  const { id } = req.params;

  const raceday = await RaceDay.findById(id).exec();

  if (!raceday) {
    res.status(404).send();
  } else {
    res.send(raceday);
  }
};

export default getRacedayById;
