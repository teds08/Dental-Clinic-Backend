import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { AdminController } from "../controllers/admin.controller";
import { CouponController } from "../controllers/coupon.controller";

const router = Router();
const adminController = new AdminController();
const couponController = new CouponController();



//admin only
router.get("/active/users",authenticate,adminOnly,(req, res) => adminController.getAll(req, res));
router.patch("/restore/user/:id",authenticate,adminOnly,(req, res) => adminController.restore(req, res));
router.post("/admin/create",authenticate,adminOnly,(req, res) => adminController.adminCreate(req, res));
router.get("/archive/users",authenticate,adminOnly,(req, res) => adminController.findArchivedUsers(req, res));


//delete routes
router.patch("/soft/delete/:id",authenticate,adminOnly,(req, res) => adminController.softDelete(req, res));
router.delete("/hard/delete/:id",authenticate,adminOnly,(req, res) => adminController.hardDelete(req, res));


//coupon routes
router.post("/coupons",authenticate,adminOnly,(req,res)=>couponController.createCoupon(req,res));


export default router;