
import multer from "multer";
import path from "path";
const storage = multer.memoryStorage(); // No need for `destination` callback
function checkFileType(file, cb) {
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname === ".xls" || extname === ".xlsx") {
    return cb(null, true);
  } else {
    return cb(new Error("Error: Only Excel files are allowed!"));
  }
}

const uploadFile = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 2000, // 20MB
  },
});

export default uploadFile;