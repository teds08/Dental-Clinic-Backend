"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreService = void 0;
const index_1 = require("../../repositories/manage-services/index");
class RestoreService {
    constructor() {
        this.repo = new index_1.RestoreServiceRepository();
    }
    async restoreService(id) {
        const result = await this.repo.restore(id);
        if (!result) {
            throw new Error("Service not found or already active");
        }
        return {
            message: "Service restored successfully",
            service: result
        };
    }
}
exports.RestoreService = RestoreService;
