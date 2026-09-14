"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAdminNotificationMessage = void 0;
const buildAdminNotificationMessage = (data, serviceTitle, formattedDate, formattedTime, hasPatientCoupon, hasEventCoupon) => {
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
exports.buildAdminNotificationMessage = buildAdminNotificationMessage;
