"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteService = void 0;
const index_1 = require("../../repositories/manage-services/index");
class SoftDeleteService {
    constructor() {
        this.repo = new index_1.SoftDeleteServiceRepository();
    }
    async deleteService(id) {
        const result = await this.repo.softDelete(id);
        if (!result) {
            throw new Error("Service not found or already archived");
        }
        return {
            message: "Service archived successfully",
            result
        };
    }
}
exports.SoftDeleteService = SoftDeleteService;
