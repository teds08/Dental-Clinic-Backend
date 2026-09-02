export const createNotificationMessage = (
  appointment: any,
  formattedDate: string,
  formattedTime: string
) => {
  return `Your appointment has been approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}

Please arrive at least 15 minutes before your appointment.`;
};