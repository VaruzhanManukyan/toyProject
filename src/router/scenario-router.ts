import {Router} from 'express';
import multer from "../config/multer-audio-config";
import ScenarioController from "../controllers/scenario-controller";
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/:publisherId/create", roleMiddleware([Roles.SUPER_ADMIN]), multer.array('audio_files'), ScenarioController.create);

export default router;