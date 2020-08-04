import express from 'express';
import * as PlayerController from '../controllers/playerController';

const playerRoutes = express.Router();
playerRoutes.route('/player')
  .post((req, res) => PlayerController.createNewPlayer(req, res));

export default playerRoutes;
