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
router.post("/user-create", (req, res) => userController.create(req, res));
router.put("/update-info/:id", (req, res) => userController.update(req, res));
router.get("/get-bearer-profile",authenticate,(req, res) => userController.profile(req, res));

//auth routes
router.post("/login", (req, res) =>authController.login(req, res));

//admin only
router.get("/Get-All-User-Data",authenticate,adminOnly,(req, res) => adminController.getAll(req, res));

router.delete("/Soft-Delete/:id",authenticate,adminOnly,(req, res) => adminController.softDelete(req, res));
router.delete("/Hard-Delete/:id",authenticate,adminOnly,(req, res) => adminController.hardDelete(req, res));

export default router;