import { FindAppointmentRepository } from "../../../repositories/appointment/index";

export const validateAppointment = async (
  client: any,
  appointmentId: number
) => {
  const findRepo = new FindAppointmentRepository(client);
  const appointment = await findRepo.findById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  if (appointment.status !== "PENDING") {
    throw new Error("Only pending appointments can be approved.");
  }

  return appointment;
};