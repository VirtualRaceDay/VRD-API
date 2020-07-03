import {
  get_Racedays,
  create_Raceday,
  get_RacedaybyId,
  update_Raceday,
  delete_Raceday,
} from '../controllers/racedayControllers';

// Create a new router to handle the books resource
const racedayRoutes = (server) => {
  server
    .route('/racedays')
    .get((res, req) => get_Racedays(res, req))
    .post((res, req) => create_Raceday(res, req));

  server
    .route('/racedays/:id')
    .get((res, req) => get_RacedaybyId(res, req))
    .put((res, req) => update_Raceday(res, req))
    .delete((req, res) => delete_Raceday(req, res));
};

// Export the router ready to be imported into an app.
export default racedayRoutes;
