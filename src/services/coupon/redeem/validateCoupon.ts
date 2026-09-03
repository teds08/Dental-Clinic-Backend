import { FindActiveCouponRepository } from "../../../repositories/manage-coupon/index";

export const validateCoupon = async (couponId: number) => {
  const couponRepository = new FindActiveCouponRepository();
  const coupon = await couponRepository.findActiveNormalCouponById(couponId);

  if (!coupon) {
    throw new Error("Normal coupon does not exist or is inactive.");
  }

  return coupon;
};