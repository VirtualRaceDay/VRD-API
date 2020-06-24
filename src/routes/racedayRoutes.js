import express from 'express';
import { getAllRacedays } from '../services/racedayRepo';

// Create a new router to handle the books resource
const router = express.Router();

// NB: This is where we will add end points
router.get('/', async (req, res) => {
  const racedays = await getAllRacedays();

  res.status(200).send(racedays);
});

// Export the router ready to be imported into an app.
export default router;
