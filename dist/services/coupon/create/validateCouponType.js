"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCouponType = void 0;
const validateCouponType = (couponType) => {
    if (couponType !== "EVENT" && couponType !== "NORMAL") {
        throw new Error("Invalid coupon type.");
    }
};
exports.validateCouponType = validateCouponType;
