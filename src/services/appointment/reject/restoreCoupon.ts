import { UpdatePatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const restoreCoupon = async (
  client: any,
  patientCouponId: number | null | undefined
) => {
  let couponWasUsed = false;
  let couponConflictDetected = false;

  if (patientCouponId !== null && patientCouponId !== undefined) {
    const patientCouponRepo = new UpdatePatientCouponRepository(client);
    const restoredCoupon = await patientCouponRepo.markAsUnused(patientCouponId);

    if (!restoredCoupon) {
      couponConflictDetected = true;
    } else {
      couponWasUsed = true;
    }
  }

  return { couponWasUsed, couponConflictDetected };
};