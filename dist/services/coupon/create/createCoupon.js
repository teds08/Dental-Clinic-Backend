"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = void 0;
const index_1 = require("../../../repositories/manage-coupon/index");
const createCoupon = async (data) => {
    const couponRepository = new index_1.CreateCouponRepository();
    return await couponRepository.create(data);
};
exports.createCoupon = createCoupon;
