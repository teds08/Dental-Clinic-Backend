"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAppointmentDetailsService = void 0;
const index_1 = require("../../repositories/appointment/index");
class FindAppointmentDetailsService {
    constructor() {
        this.repo = new index_1.FindAppointmentDetailsRepository();
    }
    async getAppointment(appointmentId, userId) {
        const appointment = await this.repo.findById(appointmentId, userId);
        if (!appointment) {
            throw new Error("Appointment not found.");
        }
        return appointment;
    }
}
exports.FindAppointmentDetailsService = FindAppointmentDetailsService;
