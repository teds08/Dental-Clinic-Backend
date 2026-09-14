"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
//user routes
router.post("/create", (req, res) => userController.register(req, res));
router.put("/update/profile", auth_middleware_1.authenticate, (req, res) => userController.update(req, res));
router.get("/profile", auth_middleware_1.authenticate, (req, res) => userController.profile(req, res));
// Authorized User password change routes
router.post("/auth/user/send/otp", auth_middleware_1.authenticate, (req, res) => userController.sendOTP(req, res));
router.post("/auth/user/verify/otp", auth_middleware_1.authenticate, (req, res) => userController.verifyOTP(req, res));
router.post("/auth/user/change/password", auth_middleware_1.authenticate, (req, res) => userController.changePassword(req, res));
router.post("/auth/user/resend/otp", auth_middleware_1.authenticate, (req, res) => userController.resendOTP(req, res));
exports.default = router;
