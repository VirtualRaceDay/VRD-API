import db from '../db';

import { PlayerSchema} from './playerModel';

const { model, Schema } = db;
const { Types } = Schema;

export const RaceDaySchema = new Schema({
  date: { type: Types.Date, default: Date.now },
  name: Types.String,
  currency: Types.String,
  pin: Types.String,
  initialStake: Types.Number,
  maxPlayers: Types.Number,
  players: [PlayerSchema],
  races: Types.Object,
});

const RaceDay = model('racedays', RaceDaySchema);

export default RaceDay;
