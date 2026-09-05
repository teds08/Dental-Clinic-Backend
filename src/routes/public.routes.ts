import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";

const router = Router();
const authController = new AuthController();

//to authenticate routes
router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgot/password", (req, res) =>
  authController.requestOtp(req, res),
);
router.post("/verify/otp", (req, res) => authController.verifyOtp(req, res));
router.post("/reset/password", (req, res) =>
  authController.resetPassword(req, res),
);
router.post("/resend/otp", (req, res) => authController.resendOtp(req, res));

export default router;
