import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {PointsController} from "../controllers/points.controller";

const router = Router();
const pointsController = new PointsController();

router.get("/me", authenticate, (req, res) => pointsController.getMyPoints(req, res));

// router.get("/me",authenticate,pointsController.getMyPoints.bind(pointsController));

export default router;