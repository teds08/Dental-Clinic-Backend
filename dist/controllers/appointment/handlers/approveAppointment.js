"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveAppointment = void 0;
const index_1 = require("../../../services/appointment/index");
const approveAppointmentService = new index_1.ApproveAppointmentService();
const approveAppointment = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await approveAppointmentService.approve(id);
        return res.status(200).json({
            message: "Appointment approved successfully.",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.approveAppointment = approveAppointment;
