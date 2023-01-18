const multer = require ("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp")

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename:(reg, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer ({
    storage: multerConfig,

    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
        return cb(null, true);
        }
        cb(null, false);
    },
    
})

module.exports = upload;