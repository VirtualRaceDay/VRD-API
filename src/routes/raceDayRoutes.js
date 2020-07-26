import * as RaceDayController from '../controllers/raceDayController';

// Create a new router to handle the books resource
const raceDayRoutes = (server) => {
  server
    .route('/racedays')
    .get((req, res) => RaceDayController.getAllRaceDays(req, res))
    .post((req, res) => RaceDayController.createRaceDay(req, res));

  server
    .route('/raceday/:id')
    .get((req, res) => RaceDayController.getRaceDayById(req, res))
    .put((req, res) => RaceDayController.updateRaceDay(req, res))
    .delete((req, res) => RaceDayController.deleteRaceDay(req, res));
};

// Export the router ready to be imported into an app.
export default raceDayRoutes;
