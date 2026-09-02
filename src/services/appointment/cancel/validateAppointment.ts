import { FindAppointmentRepository } from "../../../repositories/appointment/index";

export const validateAppointment = async (
  client: any,
  appointmentId: number,
  userId: number
) => {
  const appointmentRepo = new FindAppointmentRepository(client);
  const appointment = await appointmentRepo.findByIdAndUserId(appointmentId, userId);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  if (appointment.status !== "PENDING") {
    throw new Error("Only pending appointments can be cancelled.");
  }

  return appointment;
};