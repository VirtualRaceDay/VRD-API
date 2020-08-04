import db from '../db';
import { WagerSchema } from './wagerModel';

const { model, Schema } = db;
const { Types } = Schema;

export const PlayerSchema = new Schema({
  name: Types.String,
  startingFunds: Types.Number,
  currentFunds: Types.Number,
  wagers: [WagerSchema],
});

const Player = model('player', PlayerSchema);
export default Player;
