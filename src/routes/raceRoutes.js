import express from 'express';
import * as RaceController from '../controllers/raceController';

const raceRoutes = express.Router();
raceRoutes.route('/race')
  //.get((req, res) => RaceController.getAllRaces(req, res))
  .post((req, res) => RaceController.createRace(req, res));

raceRoutes.route('/race/:id/start')
  .put((req, res) => RaceController.startRace(req, res));

raceRoutes.route('/race/:id/finish')
  .put((req, res) => RaceController.finishRace(req, res));

raceRoutes.route('/race/:id')
  .get((req, res) => RaceController.getRaceById(req, res));

// raceDayRoutes.route('/raceday/:id')
//   .get((req, res) => RaceDayController.getRaceDayById(req, res))
//   .put((req, res) => RaceDayController.updateRaceDay(req, res))
//   .delete((req, res) => RaceDayController.deleteRaceDayById(req, res));

export default raceRoutes;
