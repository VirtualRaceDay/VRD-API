import db from '../db';
const { model, Schema } = db;
const { Types } = Schema;

export const PlayerSchema = new Schema({
  name: Types.String,
  startingFunds: Types.Number,
  currentFunds: Types.Number,
  wagers: [{ type: Types.ObjectId, ref: 'wager' }],
});

const Player = model('player', PlayerSchema);
export default Player;
