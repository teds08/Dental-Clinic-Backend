import { UpdateAppointmentStatusRepository } from "../../../repositories/appointment/index";

export const updateAppointmentStatus = async (
  client: any,
  appointmentId: number
) => {
  const appointmentStatusRepo = new UpdateAppointmentStatusRepository(client);

  const completedAppointment = await appointmentStatusRepo.updateStatus(
    appointmentId,
    "APPROVED",
    "COMPLETED"
  );

  if (!completedAppointment) {
    throw new Error("Appointment has already been updated.");
  }

  return completedAppointment;
};