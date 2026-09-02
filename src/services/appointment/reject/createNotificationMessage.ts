export const createNotificationMessage = (
  appointment: any,
  formattedDate: string,
  formattedTime: string,
  couponWasUsed: boolean,
  couponConflictDetected: boolean
) => {
  return `Unfortunately, your appointment could not be approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}

${couponConflictDetected
  ? `Coupon Conflict Detected.
There was a problem with the coupon associated with this appointment.`
  : couponWasUsed
  ? `Your coupon has been returned to your coupon inventory.`
  : ``}
Please contact the clinic or book another available schedule.`;
};