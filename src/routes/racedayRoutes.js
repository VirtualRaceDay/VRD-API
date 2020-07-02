import express from 'express';
import getAllRacedays from '../services/getRacedayService';
import createRacedayService from '../services/createRacedayService';

// Create a new router to handle the books resource
const router = express.Router();

// NB: This is where we will add end points
router.get('/', async (req, res) => {
  getAllRacedays(res);
});

router.post('/', async (req, res) => {
  createRacedayService(req, res);
});

// Export the router ready to be imported into an app.
export default router;
