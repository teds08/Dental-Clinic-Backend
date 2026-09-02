import { UpdatePatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const markCouponAsUsed = async (
  client: any,
  patientCouponId: number | null | undefined
) => {
  if (patientCouponId === null || patientCouponId === undefined) {
    return; // No coupon to mark
  }

  const couponRepo = new UpdatePatientCouponRepository(client);
  await couponRepo.markAsUsed(patientCouponId);
};