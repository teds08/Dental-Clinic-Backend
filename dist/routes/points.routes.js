"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const points_controller_1 = require("../controllers/points.controller");
const router = (0, express_1.Router)();
const pointsController = new points_controller_1.PointsController();
router.get("/me", auth_middleware_1.authenticate, (req, res) => pointsController.getMyPoints(req, res));
exports.default = router;
