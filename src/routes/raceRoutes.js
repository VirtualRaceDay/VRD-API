import express from 'express';
import * as RaceController from '../controllers/raceController';

const raceRoutes = express.Router();
raceRoutes.route('/race')
  //.get((req, res) => RaceController.getAllRaces(req, res))
  .post((req, res) => RaceController.createRace(req, res));

// raceDayRoutes.route('/raceday/:id/leaderboard')
//   .get((req, res) => RaceDayController.getLeaderboardForRace(req, res));

// raceDayRoutes.route('/raceday/:id')
//   .get((req, res) => RaceDayController.getRaceDayById(req, res))
//   .put((req, res) => RaceDayController.updateRaceDay(req, res))
//   .delete((req, res) => RaceDayController.deleteRaceDayById(req, res));

export default raceRoutes;
