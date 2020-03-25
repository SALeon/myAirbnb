module.exports = {
  PORT: process.env.PORT || 3001,
  DEV: process.env.DEV || false,
  DB_URI: process.env.DB_URI,
  SECRET: process.env.SECRET || 'secret',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  STRIPE_SK: process.env.STRIPE_SK || 'sk_test_qv6u2bUKNqPtLYhaQMEmfQXM00NvOoI0g3',
  GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET || 'room-book-bukcet',
  PROJECT_ID: process.env.GCLOUD_STORAGE_BUCKET || 'room-book-264007',
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    '/Users/siarheileanavets/work/diploma/room-book/client/config/Room Book-68f7fba6d2d0.json'
};
