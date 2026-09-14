"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEventCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const validateEventCoupon = async (couponId) => {
    if (couponId === null || couponId === undefined) {
        return null;
    }
    const couponRepo = new index_1.FindActiveCouponRepository();
    const eventCoupon = await couponRepo.findActiveEventCouponById(couponId);
    if (!eventCoupon) {
        throw new Error("The selected Event Coupon is not active or has expired.");
    }
    return eventCoupon;
};
exports.validateEventCoupon = validateEventCoupon;
