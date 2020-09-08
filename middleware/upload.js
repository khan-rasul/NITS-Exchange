var multer = require("multer"),
    path   = require("path"),
    util   = require("util");

var upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb){
    var filetypes=/jpeg|jpg|png/;
    var extname = filetypes.test(path.extname(file.originalname));
    var mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype)
      return cb(null, true);
    else cb("FILE_TYPE");
  }
}).array("images", 5);

var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware;