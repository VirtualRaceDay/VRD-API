import express from 'express';
import * as PodiumController from '../controllers/podiumController';

const podiumRoutes = express.Router();
podiumRoutes.route('/podium/:id')
  .get((req, res) => PodiumController.getPodium(req, res));

export default podiumRoutes;
