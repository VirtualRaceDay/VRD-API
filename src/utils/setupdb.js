import mongoose from 'mongoose';

import logger from '../logging';

/**
 * Connect to a mongoose database
 *
 * @param {string} mongoDbUri the URI of the MongoDB to connect too. Including credentials
 * @returns {Mongoose} the Mongoose API setup for this application.
 */
export default (mongoDbUri) => {
  // Create the database connection
  mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log successful connection
  mongoose.connection.on('connected', () => {
    logger.info(`Mongoose connection open to database at ${mongoDbUri}`);
  });

  // If the connection throws an error, log it
  mongoose.connection.on('error', (err) => {
    logger.error('Mongoose connection error', err);
  });

  // Log disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose connection disconnected');
  });

  // If the user attempts to close the app by terminating it then cleanup and exit
  process.on('SIGINT', () => {
    logger.warn('SIGINT received, shutting down connection');
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });

  return mongoose;
};
