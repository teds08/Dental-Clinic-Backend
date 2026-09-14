"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemCoupon = void 0;
const index_1 = require("../../../services/coupon/index");
const coupon_validator_1 = require("../../../validators/coupon.validator");
const redeemCouponService = new index_1.RedeemCouponService();
const redeemCoupon = async (req, res) => {
    try {
        const validated = coupon_validator_1.redeemCouponValidator.parse(req.body);
        const userId = req.user.id;
        await redeemCouponService.redeem(userId, validated.patient_coupon_id);
        return res.status(200).json({
            message: "Coupon redeemed successfully.",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.redeemCoupon = redeemCoupon;
