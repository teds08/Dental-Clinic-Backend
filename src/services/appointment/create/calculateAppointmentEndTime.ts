import { calculateEndTime } from "../../../utils/appointment.time";

export const calculateAppointmentEndTime = (
  appointmentTime: string,
  durationMinutes: number
): string => {
  return calculateEndTime(appointmentTime, durationMinutes);
};