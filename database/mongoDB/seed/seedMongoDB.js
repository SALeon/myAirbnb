const mongoose = require('mongoose');/* eslint-disable-line */
const mongoDB = require('../mongoDB');/* eslint-disable-line */
const Rental = require('../../../models/rental');
const rentals = require('./rentals.json');
const User = require('../../../models/user');
const users = require('./users.json');

const addRentals = async () => {
  try {
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

const seedMongoDB = async () => {
  await addRentals();
};

try {
  seedMongoDB();
} catch (err) {
  console.log('error while closing connection with mongoDB');
}
