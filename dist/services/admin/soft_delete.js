"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteUserAdminService = void 0;
const index_1 = require("../../repositories/manage-users/index");
class SoftDeleteUserAdminService {
    constructor() {
        this.softDeleteRepository = new index_1.SoftDeleteRepository();
    }
    async softDeleteUser(id) {
        return await this.softDeleteRepository.softDelete(id);
    }
}
exports.SoftDeleteUserAdminService = SoftDeleteUserAdminService;
