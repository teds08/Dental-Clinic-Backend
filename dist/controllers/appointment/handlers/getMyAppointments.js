"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAppointments = void 0;
const index_1 = require("../../../services/appointment/index");
const findMyAppointmentsService = new index_1.FindMyAppointmentsService();
const getMyAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await findMyAppointmentsService.getAppointments(userId);
        return res.status(200).json({
            message: "Appointments retrieved successfully.",
            data: appointments,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getMyAppointments = getMyAppointments;
