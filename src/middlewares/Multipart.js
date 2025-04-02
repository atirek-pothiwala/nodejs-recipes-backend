const fs = require("fs");
const multer = require("multer");
const path = require("path");

class Multipart {
    static create(folder) {
        // Adjust path as per your structure
        const uploadDir = path.join(__dirname, `../../uploads/${folder}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Configure Multer Storage
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `uploads/${folder}`); // Store files in the uploads folder
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename file
            }
        });

        return multer({ storage: storage });
    }

    static delete(filePath) {
        fs.rm(filePath);
    }
}


module.exports = Multipart