"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = void 0;
const index_1 = require("../../../services/coupon/index");
const deleteCouponService = new index_1.DeleteCouponService();
const deleteCoupon = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await deleteCouponService.deleteCoupon(id);
        return res.status(200).json({
            message: "Coupon deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.deleteCoupon = deleteCoupon;
