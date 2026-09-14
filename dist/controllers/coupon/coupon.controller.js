"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const createCoupon_1 = require("./handlers/createCoupon");
const getAllCoupons_1 = require("./handlers/getAllCoupons");
const updateCoupon_1 = require("./handlers/updateCoupon");
const updateCouponStatus_1 = require("./handlers/updateCouponStatus");
const deleteCoupon_1 = require("./handlers/deleteCoupon");
const redeemCoupon_1 = require("./handlers/redeemCoupon");
class CouponController {
    async createCoupon(req, res) {
        return (0, createCoupon_1.createCoupon)(req, res);
    }
    async getAllCoupons(req, res) {
        return (0, getAllCoupons_1.getAllCoupons)(req, res);
    }
    async updateCoupon(req, res) {
        return (0, updateCoupon_1.updateCoupon)(req, res);
    }
    async updateCouponStatus(req, res) {
        return (0, updateCouponStatus_1.updateCouponStatus)(req, res);
    }
    async deleteCoupon(req, res) {
        return (0, deleteCoupon_1.deleteCoupon)(req, res);
    }
    async redeemCoupon(req, res) {
        return (0, redeemCoupon_1.redeemCoupon)(req, res);
    }
}
exports.CouponController = CouponController;
