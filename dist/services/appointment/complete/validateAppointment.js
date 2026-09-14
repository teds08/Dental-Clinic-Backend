"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointment = void 0;
const index_1 = require("../../../repositories/appointment/index");
const validateAppointment = async (client, appointmentId) => {
    const appointmentRepo = new index_1.FindAppointmentRepository(client);
    const appointment = await appointmentRepo.findById(appointmentId);
    if (!appointment) {
        throw new Error("Appointment not found.");
    }
    if (appointment.status !== "APPROVED") {
        throw new Error("Only approved appointments can be completed.");
    }
    return appointment;
};
exports.validateAppointment = validateAppointment;
