"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
//to authenticate routes
router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgot/password", (req, res) => authController.requestOtp(req, res));
router.post("/verify/otp", (req, res) => authController.verifyOtp(req, res));
router.post("/reset/password", (req, res) => authController.resetPassword(req, res));
router.post("/resend/otp", (req, res) => authController.resendOtp(req, res));
exports.default = router;
