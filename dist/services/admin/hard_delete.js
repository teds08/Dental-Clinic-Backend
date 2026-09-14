"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardDeleteUserAdminService = void 0;
const index_1 = require("../../repositories/manage-users/index");
class HardDeleteUserAdminService {
    constructor() {
        this.hardDeleteRepository = new index_1.HardDeleteRepository();
    }
    async hardDeleteUser(id) {
        return await this.hardDeleteRepository.hardDelete(id);
    }
}
exports.HardDeleteUserAdminService = HardDeleteUserAdminService;
