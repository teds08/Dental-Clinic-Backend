"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const index_1 = require("../../repositories/user/index");
class UpdateUserService {
    constructor() {
        this.repo = new index_1.UpdateUserRepository();
    }
    async updateUser(id, data) {
        const user = await this.repo.update(id, data);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
}
exports.UpdateUserService = UpdateUserService;
