export const validateAppointmentAmounts = (appointment: any): void => {
  if (appointment.points_earned < 0) {
    throw new Error("Invalid reward points stored for this appointment.");
  }

  if (appointment.original_amount < 0) {
    throw new Error("Invalid original amount stored for this appointment.");
  }

  if (appointment.discount_amount < 0) {
    throw new Error("Invalid discount amount stored for this appointment.");
  }

  if (appointment.final_amount < 0) {
    throw new Error("Invalid final amount stored for this appointment.");
  }

  if (appointment.final_amount > appointment.original_amount) {
    throw new Error("Invalid payment information stored for this appointment.");
  }
};