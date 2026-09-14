"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindArchiveUsersService = void 0;
const index_1 = require("../../repositories/manage-users/index");
class FindArchiveUsersService {
    constructor() {
        this.repo = new index_1.FindArchiveUsersRepository();
    }
    async getArchivedUsers() {
        const users = await this.repo.findArchivedUsers();
        return {
            message: "Archived users fetched successfully",
            users
        };
    }
}
exports.FindArchiveUsersService = FindArchiveUsersService;
