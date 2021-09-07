const express = require("express");
const multer = require("multer");
const path = require("path")

let storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/images");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

let storageContent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/content");
  },
  filename: function (req, file, cb) {
    // let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

let uploadImg = multer({
  storage: storagePhoto,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 5000000,
  }
})

let uploadC = multer({
  storage: storageContent,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 5000000,
  }
})

const fromUpload = {
  uploadImage: (req, res, next) => {
    const uploadImage = uploadImg.single("images");
    uploadImage(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file == undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },

  uploadContent: (req, res, next) => {
    const uploadContent = uploadC.single("content");
    uploadContent(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },

};

module.exports = fromUpload;
