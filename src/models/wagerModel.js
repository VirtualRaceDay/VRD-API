import db from '../db';

const { model, Schema } = db;
const { Types } = Schema;

export const WagerSchema = new Schema({
  race: Types.Number,
  horseNumber: Types.Number,
  amount: Types.Number
});

const Wager = model('wager', WagerSchema);
export default Wager;
