import RaceDay from '../models/racedayModel';

export const updateRaceday = async (req, res) => {
  const raceday = req.body;
  const { id } = req.params;

  try {
    await RaceDay.updateOne({ _id: id }, raceday).exec();
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
};

export default updateRaceday;
