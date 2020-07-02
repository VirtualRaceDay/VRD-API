import RaceDay from '../models/racedayModel';

export const createRaceday = async (req, res) => {
  try {
    const raceday = await insertRacedayIntoDb(req);
    res.status(201).send(raceday);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
};

const insertRacedayIntoDb = (req) => {
  const raceday = req.body;
  let newRaceday = new RaceDay(raceday);

  return new Promise((success, fail) => {
    newRaceday.save().then(success).catch(fail);
  });
};

export default createRaceday;
