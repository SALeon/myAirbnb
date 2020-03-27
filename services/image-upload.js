const multer = require('multer');
const Storage = require('@google-cloud/storage').Storage;
const config = require('../config/envSetting');
const storage = new Storage({
  projectId: config.PROJECT_ID,
  keyFilename: config.GOOGLE_APPLICATION_CREDENTIALS
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multer.memoryStorage()
});

const bucket = storage.bucket(config.GCLOUD_STORAGE_BUCKET);

module.exports = { upload, bucket };
