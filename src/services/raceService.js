import Race from '../models/raceModel';

export const getRaceById = (id) => Race.findById(id).exec();

export const createRace = async (race) => {
  const newRace = new Race(race);
  newRace.state = 'not-started';
  await newRace.save();
  return newRace;
};

export const addRaceToRaceCard = async (raceCard, race) => {
  await race.save();
  raceCard.races.addToSet(race._id);

  await raceCard.save();
  return;
};

export const updateRaceState = async (raceId, state) => {
  const race = await getRaceById(raceId);
  race.state = state;
  await race.save();
  return;
};
