export const validateEventCoupon = (data: any): void => {
  // Event coupons cannot require reward points
  if (data.required_points !== null && data.required_points !== undefined) {
    throw new Error("Event coupons cannot require reward points.");
  }

  // Event coupons require a start date
  if (!data.start_date) {
    throw new Error("Event coupons require a start date.");
  }

  // Event coupons require an end date
  if (!data.end_date) {
    throw new Error("Event coupons require an end date.");
  }

  // Check date order
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  if (startDate > endDate) {
    throw new Error(
      "Event coupon end date must be on or after the start date."
    );
  }
};