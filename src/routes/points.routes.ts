import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {PointsController} from "../controllers/points.controller";

const router = Router();
const pointsController = new PointsController();

router.get("/me", authenticate, (req, res) => pointsController.getMyPoints(req, res));


export default router;