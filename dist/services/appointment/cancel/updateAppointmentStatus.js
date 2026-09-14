"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = void 0;
const index_1 = require("../../../repositories/appointment/index");
const updateAppointmentStatus = async (client, appointmentId) => {
    const statusRepo = new index_1.UpdateAppointmentStatusRepository(client);
    const updatedAppointment = await statusRepo.updateStatus(appointmentId, "PENDING", "CANCELLED");
    if (!updatedAppointment) {
        throw new Error("Appointment has already been updated.");
    }
    return updatedAppointment;
};
exports.updateAppointmentStatus = updateAppointmentStatus;
