"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMyAppointmentsService = void 0;
const index_1 = require("../../repositories/appointment/index");
class FindMyAppointmentsService {
    constructor() {
        this.repo = new index_1.FindMyAppointmentsRepository();
    }
    async getAppointments(userId) {
        return await this.repo.getByUserId(userId);
    }
}
exports.FindMyAppointmentsService = FindMyAppointmentsService;
