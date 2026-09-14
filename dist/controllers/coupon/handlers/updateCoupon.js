"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoupon = void 0;
const index_1 = require("../../../services/coupon/index");
const updateCouponService = new index_1.UpdateCouponService();
const updateCoupon = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await updateCouponService.updateCoupon(id, req.body);
        return res.status(200).json({
            message: "Coupon updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateCoupon = updateCoupon;
