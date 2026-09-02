import { UpdatePatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const restoreCoupon = async (
  client: any,
  patientCouponId: number | null | undefined
) => {
  if (patientCouponId === null || patientCouponId === undefined) {
    return; // No coupon to restore
  }

  const patientCouponRepo = new UpdatePatientCouponRepository(client);
  const restoredCoupon = await patientCouponRepo.markAsUnused(patientCouponId);

  if (!restoredCoupon) {
    throw new Error("The patient coupon could not be restored.");
  }
};