"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsController = void 0;
const index_1 = require("../services/points/index");
const getPatientPointsService = new index_1.GetPatientPointsService();
class PointsController {
    async getMyPoints(req, res) {
        try {
            const userId = req.user.id;
            const result = await getPatientPointsService.getPoints(userId);
            return res.status(200).json({
                message: "Patient points retrieved successfully.",
                data: result
            });
        }
        catch (error) {
            return res.status(404).json({
                message: error.message
            });
        }
    }
}
exports.PointsController = PointsController;
