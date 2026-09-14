"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const index_1 = require("../../../services/admin/index");
const adminDashboardService = new index_1.AdminDashboardService();
const getDashboard = async (req, res) => {
    try {
        const dashboard = await adminDashboardService.getDashboard();
        return res.status(200).json({
            success: true,
            message: "Admin dashboard retrieved successfully.",
            data: dashboard,
        });
    }
    catch (error) {
        console.error("Get admin dashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve admin dashboard.",
        });
    }
};
exports.getDashboard = getDashboard;
