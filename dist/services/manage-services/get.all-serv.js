"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServiceService = void 0;
const index_1 = require("../../repositories/manage-services/index");
class GetAllServiceService {
    constructor() {
        this.repo = new index_1.GetAllServiceRepository();
    }
    async getAllServices() {
        const services = await this.repo.getAll();
        return services;
    }
}
exports.GetAllServiceService = GetAllServiceService;
