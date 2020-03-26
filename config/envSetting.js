module.exports = {
  PORT: process.env.PORT || 3001,
  DEV: process.env.DEV || false,
  SECRET: process.env.SECRET || 'secret',
  STRIPE_SK: process.env.STRIPE_SK || 'sk_test_qv6u2bUKNqPtLYhaQMEmfQXM00NvOoI0g3',
  GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET || 'room-book-bukcet',
  PROJECT_ID: process.env.GCLOUD_STORAGE_BUCKET || 'room-book-264007',
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    '/Users/siarheileanavets/work/myAirbnb/client/config/Room Book-68f7fba6d2d0.json'
};
