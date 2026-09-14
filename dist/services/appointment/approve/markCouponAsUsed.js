"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markCouponAsUsed = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const markCouponAsUsed = async (client, patientCouponId) => {
    if (patientCouponId === null || patientCouponId === undefined) {
        return; // No coupon to mark
    }
    const couponRepo = new index_1.UpdatePatientCouponRepository(client);
    await couponRepo.markAsUsed(patientCouponId);
};
exports.markCouponAsUsed = markCouponAsUsed;
