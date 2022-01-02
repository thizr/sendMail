const multer = require('multer')


const MIME_TYPES = {

    "application/msword" : "doc",
    'application/vnd.ms-powerpoint' : 'ppt',
    'application/vnd.ms-excel' : 'xls',

    'text/plain' : 'txt',

    'audio/mpeg' : 'mp3',
    'video/mp4' : 'mp4',

    'application/pdf' : 'pdf',
    'application/zip' : 'zip',
    'application/vnd.rar' : 'rar',
    'application/x-tar' : 'tar',

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif' : 'gif',

};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'files');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name);
  }
});

module.exports = multer({storage: storage}).any()