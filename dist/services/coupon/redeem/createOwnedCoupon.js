"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOwnedCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const createOwnedCoupon = async (client, userId, couponId) => {
    const patientCouponRepository = new index_1.CreatePatientCouponRepository(client);
    await patientCouponRepository.create({
        user_id: userId,
        coupon_id: couponId,
    });
};
exports.createOwnedCoupon = createOwnedCoupon;
