const mongoose = require('mongoose');
// const { addRentals } = require('./seed/seedMongoDB');
const { DB } = require('../../config/mongoSettings');

let mongoDB = null;

try {
  const connectDB = async () => {
    mongoDB = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    // console.info('Mongodb has been connected');
    // mongoose.connection.db.dropCollection('users', () => {});
    // mongoose.connection.db.dropCollection('rentals', () => {});
    // addRentals();
    return mongoDB;
  };

  connectDB();
} catch {
  console.error('Error while trying to connect with mongodb');
}

module.exports = {
  mongoDB
};
