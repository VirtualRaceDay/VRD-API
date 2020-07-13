import {
  getAllRacedays,
  createRacedayService,
  getRacedayById,
  updateRaceday,
  deleteRaceday,
} from '../controllers/racedayControllers';

// Create a new router to handle the books resource
const racedayRoutes = (server) => {
  server
    .route('/racedays')
    .get((req, res) => getAllRacedays(req, res))
    .post((req, res) => createRacedayService(req, res));

  server
    .route('/racedays/:id')
    .get((req, res) => getRacedayById(req, res))
    .put((req, res) => updateRaceday(req, res))
    .delete((req, res) => deleteRaceday(req, res));
};

// Export the router ready to be imported into an app.
export default racedayRoutes;
