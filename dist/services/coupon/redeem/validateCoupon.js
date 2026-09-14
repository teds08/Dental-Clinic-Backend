"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const validateCoupon = async (couponId) => {
    const couponRepository = new index_1.FindActiveCouponRepository();
    const coupon = await couponRepository.findActiveNormalCouponById(couponId);
    if (!coupon) {
        throw new Error("Normal coupon does not exist or is inactive.");
    }
    return coupon;
};
exports.validateCoupon = validateCoupon;
