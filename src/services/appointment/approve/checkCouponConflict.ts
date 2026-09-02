import { UpdateAppointmentStatusRepository } from "../../../repositories/appointment/index";

export const checkCouponConflict = async (
  client: any,
  appointmentId: number,
  patientCouponId: number | null | undefined
) => {
  if (patientCouponId === null || patientCouponId === undefined) {
    return null; // No coupon, no conflict
  }

  const statusRepo = new UpdateAppointmentStatusRepository(client);
  const conflictingAppointment = await statusRepo.findCouponConflict(
    appointmentId,
    patientCouponId
  );

  if (conflictingAppointment) {
    throw new Error(
      `Coupon conflict detected. ` +
      `The patient coupon used by this appointment ` +
      `is already assigned to appointment ID ` +
      `${conflictingAppointment.id} ` +
      `with status ${conflictingAppointment.status}. ` +
      `Please resolve the conflicting appointment before approving this appointment.`
    );
  }

  return null;
};