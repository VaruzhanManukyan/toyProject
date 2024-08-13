import { Router } from 'express';
import AudioFileController from "../controllers/audio-file-controller";
import {multerUpload} from "../config/multer-audio-config";

const router: Router = Router();

router.post("/create", multerUpload, AudioFileController.create);
router.post("/read", AudioFileController.getAll);
router.post("/read/:id", AudioFileController.getById);
router.post("/update/:id", multerUpload, AudioFileController.update);
router.post("/delete/:id",  AudioFileController.remove);
router.post("/get_toy_media", AudioFileController.getToyMedia);

export default router;