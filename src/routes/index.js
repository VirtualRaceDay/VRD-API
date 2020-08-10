import express from 'express';

import playerRoutes from './playerRoutes';
import raceDayRoutes from './raceDayRoutes';
import wagerRoutes from './wagerRouters';
import versionRoute from './versionRoute';

const router = express.Router();
router.use('/', playerRoutes, raceDayRoutes, versionRoute, wagerRoutes);

export default router;

