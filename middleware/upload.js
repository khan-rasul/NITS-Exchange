var multer = require("multer"),
    path   = require("path"),
    util   = require("util");

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: {fileSize: 15000000},
  fileFilter: function(req, file, cb){
    var filetypes=/jpeg|jpg|png/;
    var extname = filetypes.test(path.extname(file.originalname));
    var mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype)
      return cb(null, true);
    else cb("Error, allowed file types are jpg, jpeg, png!");
  }
}).array("images", 5);

var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware;