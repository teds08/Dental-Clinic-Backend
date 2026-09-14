"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCouponService = void 0;
const index_1 = require("../../repositories/manage-coupon/index");
class DeleteCouponService {
    constructor() {
        this.repo = new index_1.DeleteCouponRepository();
    }
    async deleteCoupon(id) {
        const coupon = await this.repo.delete(id);
        if (!coupon) {
            throw new Error("Coupon not found");
        }
        return coupon;
    }
}
exports.DeleteCouponService = DeleteCouponService;
