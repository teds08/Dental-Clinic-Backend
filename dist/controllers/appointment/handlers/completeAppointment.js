"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeAppointment = void 0;
const index_1 = require("../../../services/appointment/index");
const completeAppointmentService = new index_1.CompleteAppointmentService();
const completeAppointment = async (req, res) => {
    try {
        const appointmentId = Number(req.params.id);
        if (Number.isNaN(appointmentId)) {
            return res.status(400).json({
                message: "Invalid appointment id.",
            });
        }
        const appointment = await completeAppointmentService.complete(appointmentId);
        return res.status(200).json({
            message: "Appointment completed successfully.",
            data: appointment,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.completeAppointment = completeAppointment;
