import mongoose from 'mongoose';

/**
 * Connect to a mongoose database
 *
 * @param {string} mongoDbUri the URI of the MongoDB to connect too. Including credentials
 * @returns {Mongoose} the Mongoose API setup for this application.
 */
export default (mongoDbUri) => {
  const databaseName = mongoDbUri.substring(mongoDbUri.lastIndexOf("/"));

  // Create the database connection
  mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log successful connection
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection open to database: ${databaseName}`);
  });

  // If the connection throws an error, log it
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error', err);
  });

  // Log disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
  });

  // If the user attempts to close the app by terminating it then cleanup and exit
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });

  return mongoose;
};
