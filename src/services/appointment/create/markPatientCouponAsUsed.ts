import { UpdatePatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const markPatientCouponAsUsed = async (
  client: any,
  patientCouponId: number | null | undefined
): Promise<void> => {
  if (patientCouponId === null || patientCouponId === undefined) {
    return;
  }

  const updatePatientCouponRepo = new UpdatePatientCouponRepository(client);
  const updatedPatientCoupon = await updatePatientCouponRepo.markAsUsed(
    patientCouponId
  );

  if (!updatedPatientCoupon) {
    throw new Error("The patient coupon could not be marked as used.");
  }
};