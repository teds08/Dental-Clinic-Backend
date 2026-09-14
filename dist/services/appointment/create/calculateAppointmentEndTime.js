"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAppointmentEndTime = void 0;
const appointment_time_1 = require("../../../utils/appointment.time");
const calculateAppointmentEndTime = (appointmentTime, durationMinutes) => {
    return (0, appointment_time_1.calculateEndTime)(appointmentTime, durationMinutes);
};
exports.calculateAppointmentEndTime = calculateAppointmentEndTime;
