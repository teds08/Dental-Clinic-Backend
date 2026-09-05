import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";
import { AdminController } from "../controllers/admin/admin.controller";
import { CouponController } from "../controllers/coupon/coupon.controller";

const router = Router();
const adminController = new AdminController();
const couponController = new CouponController();

//manage users
router.get("/active/users", authenticate, adminOnly, (req, res) =>
  adminController.getAll(req, res),
);
router.patch("/restore/user/:id", authenticate, adminOnly, (req, res) =>
  adminController.restore(req, res),
);
router.post("/admin/create", authenticate, adminOnly, (req, res) =>
  adminController.adminCreate(req, res),
);
router.get("/archive/users", authenticate, adminOnly, (req, res) =>
  adminController.findArchivedUsers(req, res),
);

//delete routes
router.patch("/soft/delete/:id", authenticate, adminOnly, (req, res) =>
  adminController.softDelete(req, res),
);
router.delete("/hard/delete/:id", authenticate, adminOnly, (req, res) =>
  adminController.hardDelete(req, res),
);

//coupon routes
router.post("/create/coupons", authenticate, adminOnly, (req, res) =>
  couponController.createCoupon(req, res),
);
router.get("/all/coupons", authenticate, adminOnly, (req, res) =>
  couponController.getAllCoupons(req, res),
);
router.put("/update/coupons/:id", authenticate, adminOnly, (req, res) =>
  couponController.updateCoupon(req, res),
);
router.patch("/status/coupons/:id", authenticate, adminOnly, (req, res) =>
  couponController.updateCouponStatus(req, res),
);
router.delete("/delete/coupons/:id", authenticate, adminOnly, (req, res) =>
  couponController.deleteCoupon(req, res),
);
router.post("/redeem/coupon", authenticate, (req, res) =>
  couponController.redeemCoupon(req, res),
);

export default router;
