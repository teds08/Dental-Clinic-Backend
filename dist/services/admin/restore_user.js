"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserAdminService = void 0;
const index_1 = require("../../repositories/manage-users/index");
class RestoreUserAdminService {
    constructor() {
        this.restoreUserRepository = new index_1.RestoreUserRepository();
    }
    async restoreUser(id) {
        const user = await this.restoreUserRepository.restore(id);
        if (!user) {
            throw new Error("Deleted user not found");
        }
        return user;
    }
}
exports.RestoreUserAdminService = RestoreUserAdminService;
