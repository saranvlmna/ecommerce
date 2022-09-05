const util = require("util");
const path = require("path");
const multer = require("multer");
const dir = path.join(__dirname, "../../public");
console.log(dir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const uploadCustomerData = multer({ storage }).single("image");
const upload = util.promisify(uploadCustomerData);

module.exports = async (req, res, next) => {
  await upload(req, res);
  next();
};
