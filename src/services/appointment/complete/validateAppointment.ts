import { FindAppointmentRepository } from "../../../repositories/appointment/index";

export const validateAppointment = async (
  client: any,
  appointmentId: number
) => {
  const appointmentRepo = new FindAppointmentRepository(client);
  const appointment = await appointmentRepo.findById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  if (appointment.status !== "APPROVED") {
    throw new Error("Only approved appointments can be completed.");
  }

  return appointment;
};