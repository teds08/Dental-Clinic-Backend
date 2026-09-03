import { FindActiveCouponRepository } from "../../../repositories/manage-coupon/index";

export const validateEventCoupon = async (
  couponId: number | null | undefined
) => {
  if (couponId === null || couponId === undefined) {
    return null;
  }

  const couponRepo = new FindActiveCouponRepository();
  const eventCoupon = await couponRepo.findActiveEventCouponById(couponId);

  if (!eventCoupon) {
    throw new Error(
      "The selected Event Coupon is not active or has expired."
    );
  }

  return eventCoupon;
};