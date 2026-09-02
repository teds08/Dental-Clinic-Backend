export const buildAppointmentDateTime = (appointment: any): Date => {
  const dateStr = new Date(
    new Date(appointment.appointment_date).getTime() + 8 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 10);

  const timeStr = appointment.appointment_time.slice(0, 5);
  const appointmentDateTime = new Date(`${dateStr}T${timeStr}:00+08:00`);

  if (isNaN(appointmentDateTime.getTime())) {
    throw new Error("Invalid appointment date/time.");
  }

  return appointmentDateTime;
};