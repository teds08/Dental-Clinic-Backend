import { Router } from "express";
import { UserController } from "../controllers/user/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();
//user routes
router.post("/create", (req, res) => userController.register(req, res));
router.put("/update/profile", authenticate, (req, res) =>
  userController.update(req, res),
);
router.get("/profile", authenticate, (req, res) =>
  userController.profile(req, res),
);

// Authorized User password change routes
router.post("/auth/user/send/otp", authenticate, (req, res) =>
  userController.sendOTP(req, res),
);
router.post("/auth/user/verify/otp", authenticate, (req, res) =>
  userController.verifyOTP(req, res),
);
router.post("/auth/user/change/password", authenticate, (req, res) =>
  userController.changePassword(req, res),
);
router.post("/auth/user/resend/otp", authenticate, (req, res) =>
  userController.resendOTP(req, res),
);

export default router;
