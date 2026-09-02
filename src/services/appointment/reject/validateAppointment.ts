import { FindAppointmentRepository } from "../../../repositories/appointment/index";

const findRepo = new FindAppointmentRepository();

export const validateAppointment = async (appointmentId: number) => {
  const appointment = await findRepo.findById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  if (appointment.status !== "PENDING") {
    throw new Error("Only pending appointments can be rejected.");
  }

  return appointment;
};