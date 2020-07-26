import db from '../db';

const { model, Schema } = db;
const { Types } = Schema;

export const WagerSchema = new Schema({
  race: Types.ObjectId,
  horseNumber: Types.Number,
  wager: Types.Number,
  odds: Types.Number,
  outcome: Types.Number,
});

const Wager = model('wagers', WagerSchema);
export default Wager;
