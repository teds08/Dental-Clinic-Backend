"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentDetails = void 0;
const index_1 = require("../../../services/appointment/index");
const findAppointmentDetailsService = new index_1.FindAppointmentDetailsService();
const getAppointmentDetails = async (req, res) => {
    try {
        const appointmentId = Number(req.params.id);
        const userId = req.user.id;
        const appointment = await findAppointmentDetailsService.getAppointment(appointmentId, userId);
        return res.status(200).json({
            message: "Appointment retrieved successfully.",
            data: appointment,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
exports.getAppointmentDetails = getAppointmentDetails;
