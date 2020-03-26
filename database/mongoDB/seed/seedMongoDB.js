// const mongoose = require('mongoose');/* eslint-disable-line */
const Rental = require('../../../models/rental');
const rentals = require('./rentals.json');
const User = require('../../../models/user');
const users = require('./users.json');
// const { DB } = require('../../../config/mongoSettings');

const addRentals = async () => {
  try {
    await User.deleteMany(() => {});
    await Rental.deleteMany({ q: {}, limit: 0 }, async () => {
      const user = new User(users.users[0]);
      const userOwner = new User(users.users[1]);
      const rentalsL = [...rentals.rentals];
      rentalsL.forEach(city => {
        const rental = new Rental({ ...city });
        rental.user = userOwner;
        userOwner.rentals.push(rental);
        rental.save();
      });

      user.save();
      userOwner.save();
    });
  } catch (err) {
    console.log('error while seeding Rentals with mongoDB');
    console.error(err);
  }
};

// const seedMongoDB = async mongoDB => {
//   await addRentals();
//   console.log('22222222', mongoDB);
// };

// try {
//   const connectDB = async () => {
//     const mongoDB = await mongoose.connect(DB, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true
//     });
//     console.info('Mongodb has been connected');
//     await seedMongoDB(mongoDB);
//     await mongoDB.disconnect();
//   };

//   // connectDB();
// } catch {
//   console.error('Error while trying to connect with mongodb');
//   process.exit(1);/* eslint-disable-line */
// }

module.exports = {
  addRentals
};
