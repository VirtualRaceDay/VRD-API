import express from 'express';
import * as ResultsController from '../controllers/resultsController';

const resultRoutes = express.Router();

resultRoutes.route('/result/:id')
  .get((req, res) => ResultsController.getResults(req, res));

export default resultRoutes;
