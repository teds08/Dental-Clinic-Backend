"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointment = void 0;
const index_1 = require("../../../repositories/appointment/index");
const validateAppointment = async (client, appointmentId, userId) => {
    const appointmentRepo = new index_1.FindAppointmentRepository(client);
    const appointment = await appointmentRepo.findByIdAndUserId(appointmentId, userId);
    if (!appointment) {
        throw new Error("Appointment not found.");
    }
    if (appointment.status !== "PENDING") {
        throw new Error("Only pending appointments can be cancelled.");
    }
    return appointment;
};
exports.validateAppointment = validateAppointment;
