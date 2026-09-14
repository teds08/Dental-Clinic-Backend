"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatientCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const validatePatientCoupon = async (client, patientCouponId, userId) => {
    if (patientCouponId === null || patientCouponId === undefined) {
        return null;
    }
    const patientCouponRepo = new index_1.FindPatientCouponRepository(client);
    const patientCoupon = await patientCouponRepo.findById(patientCouponId);
    if (!patientCoupon) {
        throw new Error("Patient coupon does not exist.");
    }
    if (patientCoupon.user_id !== userId) {
        throw new Error("This coupon does not belong to you.");
    }
    if (patientCoupon.status !== "UNUSED") {
        throw new Error("This coupon has already been used.");
    }
    if (patientCoupon.type !== "NORMAL") {
        throw new Error("This patient coupon is not a normal coupon.");
    }
    return patientCoupon;
};
exports.validatePatientCoupon = validatePatientCoupon;
