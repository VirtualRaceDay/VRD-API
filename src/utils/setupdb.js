import mongoose from 'mongoose';

/**
 * Connect to a mongoose database
 *
 * @param {string} mongoDbUri the URI of the MongoDB to connect too. Including credentials
 * @param {string} databaseName the database to switch to on connection
 * @returns {Mongoose} the Mongoose API setup for this application.
 */
export default (mongoDbUri, databaseName) => {
  const connectionString = createConnString(mongoDbUri, databaseName);

  // Create the database connection
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log successful connection
  mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to database: ${databaseName}`);
  });

  // If the connection throws an error, log it and then exit the application
  mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error', err);
    process.exit(0);
  });

  // Log disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
  });

  // If the user attempts to close the app by terminating it then cleanup and exit
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      process.exit(0);
    });
  });

  return mongoose;
};

const createConnString = (mongoDbUri, databaseName) =>
  `${mongoDbUri}/${databaseName}?authSource=admin`;