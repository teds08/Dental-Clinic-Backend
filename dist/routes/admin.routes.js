"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const coupon_controller_1 = require("../controllers/coupon/coupon.controller");
const router = (0, express_1.Router)();
const adminController = new admin_controller_1.AdminController();
const couponController = new coupon_controller_1.CouponController();
//manage users
router.get("/active/users", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.getAll(req, res));
router.patch("/restore/user/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.restore(req, res));
router.post("/admin/create", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.adminCreate(req, res));
router.get("/archive/users", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.findArchivedUsers(req, res));
//delete routes
router.patch("/soft/delete/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.softDelete(req, res));
router.delete("/hard/delete/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => adminController.hardDelete(req, res));
//coupon routes
router.post("/create/coupons", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => couponController.createCoupon(req, res));
router.get("/all/coupons", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => couponController.getAllCoupons(req, res));
router.put("/update/coupons/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => couponController.updateCoupon(req, res));
router.patch("/status/coupons/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => couponController.updateCouponStatus(req, res));
router.delete("/delete/coupons/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => couponController.deleteCoupon(req, res));
router.post("/redeem/coupon", auth_middleware_1.authenticate, (req, res) => couponController.redeemCoupon(req, res));
// DashBoard
router.get("/data/dashboard", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, adminController.getDashboard);
exports.default = router;
