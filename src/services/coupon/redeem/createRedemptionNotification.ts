export const createRedemptionNotification = (coupon: any): string => {
  return `You successfully redeemed "${coupon.name}".

Discount:
${coupon.discount_percent}%

Reward Points Used:
${coupon.required_points}

The coupon has been added to your account and is ready to use during appointment booking.`;
};