import express from 'express';
import * as RaceDayController from '../controllers/raceDayController';

const raceDayRoutes = express.Router();
raceDayRoutes.route('/racedays')
  .get((req, res) => RaceDayController.getAllRaceDays(req, res))
  .post((req, res) => RaceDayController.createRaceDay(req, res));

raceDayRoutes.route('/raceday/:id/leaderboard')
  .get((req, res) => RaceDayController.getLeaderboardForRace(req, res));

raceDayRoutes.route('/raceday/:id')
  .get((req, res) => RaceDayController.getRaceDayById(req, res))
  .put((req, res) => RaceDayController.updateRaceDay(req, res))
  .delete((req, res) => RaceDayController.deleteRaceDayById(req, res));

export default raceDayRoutes;
