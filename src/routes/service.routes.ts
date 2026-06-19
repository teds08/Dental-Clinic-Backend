import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { upload } from "../config/multer";
import {ServiceController} from "../controllers/service.controller"

const router = Router();
const serviceController = new ServiceController();

router.post("/create/services",authenticate,adminOnly,upload.single("image"),(req, res) => serviceController.create(req, res));

export default router;