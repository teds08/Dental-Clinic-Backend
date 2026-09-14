"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUserAdminService = void 0;
const index_1 = require("../../repositories/manage-users/index");
class FindAllUserAdminService {
    constructor() {
        this.findAllRepository = new index_1.FindAllRepository();
    }
    async getUsers() {
        const users = await this.findAllRepository.findAll();
        return users.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contact_number: user.contact_number,
            role: user.role_name,
            created_at: user.created_at,
            updated_at: user.updated_at
        }));
    }
}
exports.FindAllUserAdminService = FindAllUserAdminService;
