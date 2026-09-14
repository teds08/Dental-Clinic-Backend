"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAppointmentDetails = void 0;
const formatAppointmentDetails = (appointment) => {
    const formattedDate = new Date(appointment.appointment_date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const formattedTime = new Date(`1970-01-01T${appointment.appointment_time}`).toLocaleTimeString("en-PH", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    return { formattedDate, formattedTime };
};
exports.formatAppointmentDetails = formatAppointmentDetails;
