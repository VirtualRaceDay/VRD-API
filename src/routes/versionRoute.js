import express from 'express';
import { version } from '../../package.json';

// really this should be unique per deployment
const versionRoutes = express.Router();
versionRoutes.route('/version')
  .get((req, res) =>
    res.status(200).send({ code: 200, data: { version }}));

export default versionRoutes;
