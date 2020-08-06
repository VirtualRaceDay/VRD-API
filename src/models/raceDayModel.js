import db from '../db';

const { model, Schema } = db;
const { Types } = Schema;

export const RaceDaySchema = new Schema({
  date: { type: Types.Date, default: Date.now },
  name: Types.String,
  currency: Types.String,
  pin: Types.String,
  initialStake: Types.Number,
  maxPlayers: Types.Number,
  players: [{ type: Types.ObjectId, ref: 'player' }],
  races: Types.Object,
});

const RaceDay = model('raceday', RaceDaySchema);

export default RaceDay;
