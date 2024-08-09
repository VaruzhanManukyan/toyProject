import multer from "multer";
import moment from "moment";

const fileFilter = (request: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads-audio/");
    },
    filename(request, file, callback) {
        const date = moment().format("DDMMYYYY-HHmmss_SSS");
        callback(null, `${date}-${file.originalname}`);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 1024
};

export default multer({ storage, fileFilter, limits });
