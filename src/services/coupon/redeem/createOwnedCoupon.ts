import { CreatePatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const createOwnedCoupon = async (
  client: any,
  userId: number,
  couponId: number
) => {
  const patientCouponRepository = new CreatePatientCouponRepository(client);

  await patientCouponRepository.create({
    user_id: userId,
    coupon_id: couponId,
  });
};