import db from '../db';

const { model, Schema } = db;
const { Types } = Schema;

const racedaySchema = new Schema({
  date: { type: Types.Date, default: Date.now },
  name: Types.String,
  currency: Types.String,
  pin: Types.String,
  initialStake: Types.Number,
  maxPlayers: Types.Number,
  players: Types.Object,
  races: Types.Object,
});

const RaceDay = model('racedays', racedaySchema);

export default RaceDay;
