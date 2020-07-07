import db from '../db';

const { model, Schema } = db;

const racedaySchema = new Schema({
  name: String,
  currency: String,
  pin: String,
  initialStake: Number,
  maxPlayers: Number,
  players: Object,
  races: Object,
});

const RaceDay = model('racedays', racedaySchema);

export default RaceDay;
