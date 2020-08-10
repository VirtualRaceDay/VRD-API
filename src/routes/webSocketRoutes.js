import playerListWSController from '../controllers/playerListWSController';
import eventStateWSController from '../controllers/eventStateController';

const router = [];
router.push({ path: '/playerlist', handler: playerListWSController });
router.push({ path: '/eventstate', handler: eventStateWSController });

export default router;
