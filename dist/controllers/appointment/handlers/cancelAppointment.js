"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = void 0;
const index_1 = require("../../../services/appointment/index");
const cancelAppointmentService = new index_1.CancelAppointmentService();
const cancelAppointment = async (req, res) => {
    try {
        const appointmentId = Number(req.params.id);
        const userId = req.user.id;
        const result = await cancelAppointmentService.cancel(appointmentId, userId);
        return res.status(200).json({
            message: "Appointment cancelled successfully.",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.cancelAppointment = cancelAppointment;
