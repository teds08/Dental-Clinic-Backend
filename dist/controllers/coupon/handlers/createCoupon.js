"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = void 0;
const index_1 = require("../../../services/coupon/index");
const coupon_validator_1 = require("../../../validators/coupon.validator");
const createCouponService = new index_1.CreateCouponService();
const createCoupon = async (req, res) => {
    try {
        const validated = coupon_validator_1.createCouponValidator.parse(req.body);
        const coupon = await createCouponService.createCoupon(validated);
        return res.status(201).json({
            message: "Coupon created successfully",
            data: coupon,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createCoupon = createCoupon;
