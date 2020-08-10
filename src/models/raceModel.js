import db from '../db';

const { model, Schema } = db;
const { Types } = Schema;

export const RaceSchema = new Schema({
  name: Types.String,
  link: Types.String,
  horses: Types.Object,
});

const Race = model('race', RaceSchema);

export default Race;
