"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAppointment = void 0;
const index_1 = require("../../../services/appointment/index");
const rejectAppointmentService = new index_1.RejectAppointmentService();
const rejectAppointment = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await rejectAppointmentService.reject(id);
        return res.status(200).json({
            message: "Appointment rejected successfully.",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.rejectAppointment = rejectAppointment;
