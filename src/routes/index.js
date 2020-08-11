import express from 'express';

import playerRoutes from './playerRoutes';
import podiumRoutes from './podiumRoutes';
import raceDayRoutes from './raceDayRoutes';
import raceRoutes from './raceRoutes';
import versionRoute from './versionRoute';
import wagerRoutes from './wagerRouters';


const router = express.Router();
router.use('/', playerRoutes, podiumRoutes, raceDayRoutes, raceRoutes, versionRoute, wagerRoutes);

export default router;

