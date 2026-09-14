"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const restoreCoupon = async (client, patientCouponId) => {
    if (patientCouponId === null || patientCouponId === undefined) {
        return; // No coupon to restore
    }
    const patientCouponRepo = new index_1.UpdatePatientCouponRepository(client);
    const restoredCoupon = await patientCouponRepo.markAsUnused(patientCouponId);
    if (!restoredCoupon) {
        throw new Error("The patient coupon could not be restored.");
    }
};
exports.restoreCoupon = restoreCoupon;
