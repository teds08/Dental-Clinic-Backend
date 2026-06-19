import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const adminController = new AdminController();


//admin only
router.get("/show/users",authenticate,adminOnly,(req, res) => adminController.getAll(req, res));
router.patch("/restore/user/:id",authenticate,adminOnly,(req, res) => adminController.restore(req, res));
router.post("/admin/create",authenticate,adminOnly,(req, res) => adminController.adminCreate(req, res));

//delete routes
router.delete("/soft/delete/:id",authenticate,adminOnly,(req, res) => adminController.softDelete(req, res));
router.delete("/hard/delete/:id",authenticate,adminOnly,(req, res) => adminController.hardDelete(req, res));

export default router;