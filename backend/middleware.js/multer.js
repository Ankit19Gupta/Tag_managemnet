const multer = require("multer");

const storage = multer.memoryStorage();

const multiParse = multer({ storage });

module.exports = { multiParse };
