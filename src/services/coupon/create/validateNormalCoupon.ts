export const validateNormalCoupon = (data: any): void => {
  // Normal coupons require reward points
  if (data.required_points === null || data.required_points === undefined) {
    throw new Error("Normal coupons require reward points.");
  }

  // Normal coupons cannot have a start date
  if (data.start_date !== null && data.start_date !== undefined) {
    throw new Error("Normal coupons cannot have a start date.");
  }

  // Normal coupons cannot have an end date
  if (data.end_date !== null && data.end_date !== undefined) {
    throw new Error("Normal coupons cannot have an end date.");
  }
};