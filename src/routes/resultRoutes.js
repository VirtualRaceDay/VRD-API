import express from 'express';
import * as ResultsController from '../controllers/resultsController';

const resultRoutes = express.Router();

resultRoutes.route('/result/:id')
  .post((req, res) => ResultsController.processWinningBets(req, res));

export default resultRoutes;
