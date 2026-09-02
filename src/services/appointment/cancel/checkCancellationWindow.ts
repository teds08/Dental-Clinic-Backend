export const checkCancellationWindow = (appointmentDateTime: Date): void => {
  const now = new Date();
  const difference = appointmentDateTime.getTime() - now.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (difference <= twentyFourHours) {
    throw new Error(
      "Appointments cannot be cancelled within 24 hours of the scheduled time."
    );
  }
};