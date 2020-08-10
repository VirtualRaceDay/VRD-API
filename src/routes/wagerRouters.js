import express from 'express';
import * as WagerController from '../controllers/wagerController';

const wagerRoutes = express.Router();
wagerRoutes.route('/wager')
  .get((req, res) => WagerController.getWagers(req, res))
  .post((req, res) => WagerController.createWager(req, res));

wagerRoutes.route('/wagers')
  .post((req, res) => WagerController.createWagersBulk(req, res));

wagerRoutes.route('/wager/:id')
  .get((req, res) => WagerController.getWagerById(req, res))
  .put((req, res) => WagerController.updateWager(req, res))
  .delete((req, res) => WagerController.deleteWager(req, res));

export default wagerRoutes;
