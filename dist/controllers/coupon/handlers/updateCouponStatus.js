"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponStatus = void 0;
const index_1 = require("../../../services/coupon/index");
const couponStatusService = new index_1.CouponStatusService();
const updateCouponStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { is_active } = req.body;
        const result = await couponStatusService.changeStatus(id, is_active);
        return res.status(200).json({
            message: "Coupon status updated",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateCouponStatus = updateCouponStatus;
