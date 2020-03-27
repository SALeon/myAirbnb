const express = require('express');
const env = require('../config/envSetting');
const bodyParser = require('body-parser');
const path = require('path');

// eslint-disable-next-line
const Rental = require('../models/rental');
const cors = require('cors');
// eslint-disable-next-line
const config = require('../config/envSetting');
const rentalRoutes = require('../routes/rentals'),
  userRoutes = require('../routes/users'),
  bookingRoutes = require('../routes/bookings'),
  paymentRoutes = require('../routes/payments'),
  imageUploadRoutes = require('../routes/image-upload');
// eslint-disable-next-line
const mongoDB = require('../database/mongoDB/mongoDB');
const app = express();
const appPath = path.join(__dirname, '..', 'client', 'dist');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(appPath));
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', imageUploadRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(appPath, 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

app.listen(env.PORT, () => console.log(`Running server at : ${env.PORT} port`));
