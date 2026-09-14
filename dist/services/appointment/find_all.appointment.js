"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllAppointmentsService = void 0;
const index_1 = require("../../repositories/appointment/index");
class FindAllAppointmentsService {
    constructor() {
        this.repo = new index_1.FindAllAppointmentsRepository();
    }
    async getAppointments(status, search, page = 1, limit = 10) {
        return await this.repo.getAll(status, search, page, limit);
    }
}
exports.FindAllAppointmentsService = FindAllAppointmentsService;
