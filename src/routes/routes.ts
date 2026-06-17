import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const userController = new UserController();
const authController = new AuthController();
const adminController = new AdminController();

//user routes
//In Create Do not forget to add Email Checker for the Database and also if that Email is Existing or Not and also add Validation for the Password and also add Validation for the Name and also add Validation for the Phone Number and also add Validation for the Address and also add Validation for the Age and also add Validation. 
router.post("/create", (req, res) => userController.register(req, res));
router.put("/update/info/:id", (req, res) => userController.update(req, res));
router.get("/profile",authenticate,(req, res) => userController.profile(req, res));

// Authenticated password change routes
router.post("/auth/send/otp",authenticate,(req, res) => userController.sendOTP(req, res));
router.post("/auth/verify/otp",authenticate,(req, res) => userController.verifyOTP(req, res));
router.post("/auth/change/password",authenticate,(req, res) => userController.changePassword(req, res));
router.post("/auth/resend/otp",authenticate,(req, res) => userController.resendOTP(req, res));


//auth routes
router.post("/login", (req, res) =>authController.login(req, res));
router.post("/forgot/password", (req, res) =>authController.requestOtp(req, res));
router.post("/verify/otp", (req, res) =>authController.verifyOtp(req, res));
router.post("/reset/password", (req, res) =>authController.resetPassword(req, res));
router.post("/resend/otp", (req, res) =>authController.resendOtp(req, res));


//admin only
router.get("/show/users",authenticate,adminOnly,(req, res) => adminController.getAll(req, res));
router.patch("/restore/user/:id",authenticate,adminOnly,(req, res) => adminController.restore(req, res));
router.post("/admin/create",authenticate,adminOnly,(req, res) => adminController.adminCreate(req, res));

router.delete("/soft/delete/:id",authenticate,adminOnly,(req, res) => adminController.softDelete(req, res));
router.delete("/hard/delete/:id",authenticate,adminOnly,(req, res) => adminController.hardDelete(req, res));

export default router;