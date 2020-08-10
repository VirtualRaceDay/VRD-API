import express from 'express';

import playerRoutes from './playerRoutes';
import raceDayRoutes from './raceDayRoutes';
import resultRoutes from './resultRoutes';
import versionRoute from './versionRoute';
import wagerRoutes from './wagerRouters';


const router = express.Router();
router.use('/', playerRoutes, raceDayRoutes, versionRoute, wagerRoutes, resultRoutes);

export default router;

