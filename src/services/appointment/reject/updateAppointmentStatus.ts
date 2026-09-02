import { UpdateAppointmentStatusRepository } from "../../../repositories/appointment/index";

export const updateAppointmentStatus = async (
  client: any,
  appointmentId: number
) => {
  const statusRepo = new UpdateAppointmentStatusRepository(client);
  
  const updatedAppointment = await statusRepo.updateStatus(
    appointmentId,
    "PENDING",
    "REJECTED"
  );

  if (!updatedAppointment) {
    throw new Error("Appointment has already been updated.");
  }

  return updatedAppointment;
};