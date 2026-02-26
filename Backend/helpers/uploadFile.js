const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif"
};

var profileImg	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './storage/students/');
  },
  filename: function (req, file, callback) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    callback(null, `${Date.now()}.${extension}`);
  }
});

exports.profile= multer({ storage : profileImg})
