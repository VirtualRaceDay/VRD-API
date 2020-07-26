import { version } from '../../package.json';

// really this should be unique per deployment
const versionRoutes = (server) => {
  server.route('/version').get((req, res) =>
    res.status(200).send({ version }));
};

export default versionRoutes;
