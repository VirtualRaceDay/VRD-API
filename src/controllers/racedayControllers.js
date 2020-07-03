import createRaceday from '../services/createRacedayService';
import getAllRacedays from '../services/getRacedaysService';
import getRacedayById from '../services/getRacedayService';
import updateRaceday from '../services/updateRacedayService';
import deleteRaceday from '../services/deleteRacedayService';

export const create_Raceday = (req, res) => {
  createRaceday(req, res);
};

export const get_Racedays = (req, res) => {
  getAllRacedays(res);
};

export const get_RacedaybyId = (req, res) => {
  getRacedayById(req, res);
};

export const update_Raceday = (req, res) => {
  updateRaceday(req, res);
};

export const delete_Raceday = (req, res) => {
  deleteRaceday(req, res);
};
