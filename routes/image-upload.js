const { format } = require('util');
const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');
const { upload, bucket } = require('../services/image-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', UserCtrl.authMiddleware, function(req, res, next) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      predefinedAcl: 'publicRead'
    });

    blobStream.on('error', err => {
      next(err);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      res.status(200).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
  });
});

module.exports = router;
