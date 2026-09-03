export interface AppointmentAmounts {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  pointsEarned: number;
}

export const calculateAppointmentAmounts = (
  originalAmount: number,
  servicePoints: number,
  patientCoupon: any | null,
  eventCoupon: any | null
): AppointmentAmounts => {
  let discountAmount = 0;
  let finalAmount = originalAmount;
  let pointsEarned = servicePoints;

  // Apply patient coupon discount
  if (patientCoupon) {
    const discountPercent = Number(patientCoupon.discount_percent);
    discountAmount = Number(
      (originalAmount * (discountPercent / 100)).toFixed(2)
    );
    finalAmount = Number((originalAmount - discountAmount).toFixed(2));
    pointsEarned = 0; // No points when coupon is used
  }

  // Apply event coupon discount
  if (eventCoupon) {
    const discountPercent = Number(eventCoupon.discount_percent);
    discountAmount = Number(
      (originalAmount * (discountPercent / 100)).toFixed(2)
    );
    finalAmount = Number((originalAmount - discountAmount).toFixed(2));
    pointsEarned = 0; // No points when coupon is used
  }

  return { originalAmount, discountAmount, finalAmount, pointsEarned };
};