export const validateCouponType = (couponType: string): void => {
  if (couponType !== "EVENT" && couponType !== "NORMAL") {
    throw new Error("Invalid coupon type.");
  }
};