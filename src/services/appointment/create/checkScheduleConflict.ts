import { CheckAppointmentOverlapRepository } from "../../../repositories/appointment/index";

export const checkScheduleConflict = async (
  appointmentDate: string,
  appointmentTime: string,
  endTime: string
): Promise<void> => {
  const overlapRepo = new CheckAppointmentOverlapRepository();
  const hasConflict = await overlapRepo.hasConflict(
    appointmentDate,
    appointmentTime,
    endTime
  );

  if (hasConflict) {
    throw new Error("The selected schedule is already occupied.");
  }
};