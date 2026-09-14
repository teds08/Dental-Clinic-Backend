"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveListService = void 0;
const index_1 = require("../../repositories/manage-services/index");
class ArchiveListService {
    constructor() {
        this.repo = new index_1.ArchiveListRepository();
    }
    async getArchivedServices() {
        const services = await this.repo.getArchivedServices();
        return services;
    }
}
exports.ArchiveListService = ArchiveListService;
