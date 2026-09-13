import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { ServiceController } from "../controllers/service/service.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const serviceController = new ServiceController();

router.post(
  "/create/service",
  authenticate,
  adminOnly,
  upload.single("image"),
  (req, res) => serviceController.create(req, res),
);

router.patch(
  "/update/service/:id",
  authenticate,
  adminOnly,
  upload.single("image"),
  (req, res) => serviceController.update(req, res),
);

router.patch("/archive/services/:id", authenticate, adminOnly, (req, res) =>
  serviceController.archive(req, res),
);
router.patch("/restore/services/:id", authenticate, adminOnly, (req, res) =>
  serviceController.restore(req, res),
);
router.get("/services/archive", authenticate, adminOnly, (req, res) =>
  serviceController.archiveList(req, res),
);
router.get("/active/services", (req, res) =>
  serviceController.getAll(req, res),
);
router.delete("/delete/service/:id", authenticate, adminOnly, (req, res) =>
  serviceController.hardDelete(req, res),
);

export default router;
