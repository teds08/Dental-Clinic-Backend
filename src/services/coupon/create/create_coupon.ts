import { ICoupon } from "../../../interfaces/coupon.interface";
import { validateCouponType } from "./validateCouponType";
import { validateNormalCoupon } from "./validateNormalCoupon";
import { validateEventCoupon } from "./validateEventCoupon";
import { createCoupon } from "./createCoupon";

export class CreateCouponService {
  async createCoupon(data: ICoupon) {
    // Step 1: Validate coupon type
    validateCouponType(data.type);

    // Step 2: Validate NORMAL coupon requirements
    if (data.type === "NORMAL") {
      validateNormalCoupon(data);
    }

    // Step 3: Validate EVENT coupon requirements
    if (data.type === "EVENT") {
      validateEventCoupon(data);
    }

    // Step 4: Create coupon
    const coupon = await createCoupon(data);

    return coupon;
  }
}