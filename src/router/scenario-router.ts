import {Router} from 'express';
import ScenarioController from "../controllers/scenario-controller";
import {multerUploads} from "../config/multer-audio-config";

const router: Router = Router();

router.post("/:publisherId/create", multerUploads, ScenarioController.create);
router.post("/read", ScenarioController.getAll);
router.post("/read/:id", ScenarioController.getById);
router.post("/update/:id", multerUploads, ScenarioController.update);
router.post("/delete/:id", ScenarioController.remove);
router.post("/get_media_file_ids", ScenarioController.getMediaFileIds);

export default router;