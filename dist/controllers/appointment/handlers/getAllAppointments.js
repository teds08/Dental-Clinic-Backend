"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointments = getAllAppointments;
const index_1 = require("../../../services/appointment/index");
const service = new index_1.FindAllAppointmentsService();
async function getAllAppointments(req, res) {
    try {
        const status = typeof req.query.status === "string" ? req.query.status : undefined;
        const search = typeof req.query.search === "string" ? req.query.search : undefined;
        const page = typeof req.query.page === "string" ? Number(req.query.page) : 1;
        const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : 10;
        const result = await service.getAppointments(status, search, page, limit);
        const totalPages = Math.ceil(result.total / limit);
        return res.status(200).json({
            message: "Appointments retrieved successfully.",
            appointments: result.appointments,
            pagination: {
                page,
                limit,
                total: result.total,
                total_pages: totalPages,
            },
        });
    }
    catch (error) {
        console.error("Get all appointments error:", error);
        return res.status(500).json({
            message: "Failed to retrieve appointments.",
        });
    }
}
