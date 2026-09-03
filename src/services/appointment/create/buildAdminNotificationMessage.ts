export const buildAdminNotificationMessage = (
  data: any,
  serviceTitle: string,
  formattedDate: string,
  formattedTime: string,
  hasPatientCoupon: boolean,
  hasEventCoupon: boolean
): string => {
  let message = `A new appointment has been booked.

Patient: ${data.first_name} ${data.last_name}
Service: ${serviceTitle}
Date: ${formattedDate}
Time: ${formattedTime}
Notes: ${data.doctor_notes ?? "None"}
Status: Pending`;

  if (hasPatientCoupon) {
    message += `

A reward coupon was applied to this appointment.`;
  }

  if (hasEventCoupon) {
    message += `

An Event Coupon was applied to this appointment.`;
  }

  return message;
};