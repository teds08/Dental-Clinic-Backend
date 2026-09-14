"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponService = void 0;
const index_1 = require("../../repositories/manage-coupon/index");
class UpdateCouponService {
    constructor() {
        this.repo = new index_1.UpdateCouponRepository();
    }
    async updateCoupon(id, data) {
        const coupon = await this.repo.update(id, data);
        if (!coupon) {
            throw new Error("Coupon not found");
        }
        return coupon;
    }
}
exports.UpdateCouponService = UpdateCouponService;
