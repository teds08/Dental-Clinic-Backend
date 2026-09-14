"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPatientPointsService = void 0;
const index_1 = require("../../repositories/manage-patient-points/index");
class GetPatientPointsService {
    constructor() {
        this.repo = new index_1.GetPatientPointsRepository();
    }
    async getPoints(userId) {
        const points = await this.repo.findByUserId(userId);
        if (!points) {
            throw new Error("Points account not found.");
        }
        return points;
    }
}
exports.GetPatientPointsService = GetPatientPointsService;
