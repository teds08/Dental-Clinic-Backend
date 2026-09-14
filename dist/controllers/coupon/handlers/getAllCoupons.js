"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoupons = void 0;
const index_1 = require("../../../services/coupon/index");
const findAllCouponService = new index_1.FindAllCouponService();
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await findAllCouponService.getCoupons();
        return res.status(200).json({
            message: "Coupons fetched successfully",
            data: coupons,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAllCoupons = getAllCoupons;
