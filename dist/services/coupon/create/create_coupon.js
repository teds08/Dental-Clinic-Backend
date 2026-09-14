"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponService = void 0;
const validateCouponType_1 = require("./validateCouponType");
const validateNormalCoupon_1 = require("./validateNormalCoupon");
const validateEventCoupon_1 = require("./validateEventCoupon");
const createCoupon_1 = require("./createCoupon");
class CreateCouponService {
    async createCoupon(data) {
        // Step 1: Validate coupon type
        (0, validateCouponType_1.validateCouponType)(data.type);
        // Step 2: Validate NORMAL coupon requirements
        if (data.type === "NORMAL") {
            (0, validateNormalCoupon_1.validateNormalCoupon)(data);
        }
        // Step 3: Validate EVENT coupon requirements
        if (data.type === "EVENT") {
            (0, validateEventCoupon_1.validateEventCoupon)(data);
        }
        // Step 4: Create coupon
        const coupon = await (0, createCoupon_1.createCoupon)(data);
        return coupon;
    }
}
exports.CreateCouponService = CreateCouponService;
