"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = void 0;
const index_1 = require("../../../repositories/appointment/index");
const updateAppointmentStatus = async (client, appointmentId) => {
    const appointmentStatusRepo = new index_1.UpdateAppointmentStatusRepository(client);
    const completedAppointment = await appointmentStatusRepo.updateStatus(appointmentId, "APPROVED", "COMPLETED");
    if (!completedAppointment) {
        throw new Error("Appointment has already been updated.");
    }
    return completedAppointment;
};
exports.updateAppointmentStatus = updateAppointmentStatus;
