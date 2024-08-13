import { Router } from 'express';
import PublisherController from "../controllers/publisher-controller";

const router: Router = Router();

router.post("/create", PublisherController.create);
router.post("/read", PublisherController.getAll);
router.post("/read/:id", PublisherController.getById);
router.post("/update/:id", PublisherController.update);
router.post("/delete/:id",  PublisherController.remove);

export default router;