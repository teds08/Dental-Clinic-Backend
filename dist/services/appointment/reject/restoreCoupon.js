"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const restoreCoupon = async (client, patientCouponId) => {
    let couponWasUsed = false;
    let couponConflictDetected = false;
    if (patientCouponId !== null && patientCouponId !== undefined) {
        const patientCouponRepo = new index_1.UpdatePatientCouponRepository(client);
        const restoredCoupon = await patientCouponRepo.markAsUnused(patientCouponId);
        if (!restoredCoupon) {
            couponConflictDetected = true;
        }
        else {
            couponWasUsed = true;
        }
    }
    return { couponWasUsed, couponConflictDetected };
};
exports.restoreCoupon = restoreCoupon;
