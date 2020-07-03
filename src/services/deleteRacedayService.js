import RaceDay from '../models/racedayModel';

const deleteRaceday = async (req, res) => {
  const { id } = req.params;

  await RaceDay.deleteOne({ _id: id }).exec();

  res.status(204).send();
};

export default deleteRaceday;
