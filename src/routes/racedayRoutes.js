import {
  getAllRacedaysService,
  createRacedayService,
  getRacedayByIdService,
  updateRacedayService,
  deleteRacedayService,
  getRacedayByPinService,
} from '../controllers/racedayControllers';

// Create a new router to handle the books resource
const racedayRoutes = (server) => {
  server
    .route('/racedays')
    .get((req, res) => getAllRacedaysService(req, res))
    .post((req, res) => createRacedayService(req, res));

  server
    .route('/racedays/:id')
    .get((req, res) => getRacedayByIdService(req, res))
    .put((req, res) => updateRacedayService(req, res))
    .delete((req, res) => deleteRacedayService(req, res));

  server
    .route('/raceday/:pin')
    .get((req, res) => getRacedayByPinService(req, res));
};

// Export the router ready to be imported into an app.
export default racedayRoutes;
