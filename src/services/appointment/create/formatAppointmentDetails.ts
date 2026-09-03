export interface FormattedAppointmentDetails {
  formattedDate: string;
  formattedTime: string;
}

export const formatAppointmentDetails = (
  appointmentDate: string,
  appointmentTime: string
): FormattedAppointmentDetails => {
  const formattedDate = new Date(appointmentDate).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(
    `1970-01-01T${appointmentTime}`
  ).toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { formattedDate, formattedTime };
};