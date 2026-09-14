"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markPatientCouponAsUsed = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const markPatientCouponAsUsed = async (client, patientCouponId) => {
    if (patientCouponId === null || patientCouponId === undefined) {
        return;
    }
    const updatePatientCouponRepo = new index_1.UpdatePatientCouponRepository(client);
    const updatedPatientCoupon = await updatePatientCouponRepo.markAsUsed(patientCouponId);
    if (!updatedPatientCoupon) {
        throw new Error("The patient coupon could not be marked as used.");
    }
};
exports.markPatientCouponAsUsed = markPatientCouponAsUsed;
