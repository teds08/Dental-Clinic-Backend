"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllCouponService = void 0;
const index_1 = require("../../repositories/manage-coupon/index");
class FindAllCouponService {
    constructor() {
        this.repo = new index_1.FindAllCouponRepository();
    }
    async getCoupons() {
        return await this.repo.findAll();
    }
}
exports.FindAllCouponService = FindAllCouponService;
