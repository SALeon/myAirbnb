const mongoose = require('mongoose');
const { DB } = require('../../config/mongoSettings');

let mongoDB = null;

try {
  const connectDB = async () => {
    mongoDB = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.info('Mongodb has been connected');
    return mongoDB;
  };

  connectDB();
} catch {
  console.error('Error while trying to connect with mongodb');
}

module.exports = {
  mongoDB
};
