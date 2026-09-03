import { FindPatientCouponRepository } from "../../../repositories/manage-coupon/index";

export const validatePatientCoupon = async (
  client: any,
  patientCouponId: number | null | undefined,
  userId: number
) => {
  if (patientCouponId === null || patientCouponId === undefined) {
    return null;
  }

  const patientCouponRepo = new FindPatientCouponRepository(client);
  const patientCoupon = await patientCouponRepo.findById(patientCouponId);

  if (!patientCoupon) {
    throw new Error("Patient coupon does not exist.");
  }

  if (patientCoupon.user_id !== userId) {
    throw new Error("This coupon does not belong to you.");
  }

  if (patientCoupon.status !== "UNUSED") {
    throw new Error("This coupon has already been used.");
  }

  if (patientCoupon.type !== "NORMAL") {
    throw new Error("This patient coupon is not a normal coupon.");
  }

  return patientCoupon;
};