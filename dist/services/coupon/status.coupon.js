"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStatusService = void 0;
const index_1 = require("../../repositories/manage-coupon/index");
class CouponStatusService {
    constructor() {
        this.repo = new index_1.CouponStatusRepository();
    }
    async changeStatus(id, status) {
        const coupon = await this.repo.updateStatus(id, status);
        if (!coupon) {
            throw new Error("Coupon not found");
        }
        return coupon;
    }
}
exports.CouponStatusService = CouponStatusService;
