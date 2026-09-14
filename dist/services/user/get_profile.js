"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileService = void 0;
const index_1 = require("../../repositories/user/index");
class GetProfileService {
    constructor() {
        this.repo = new index_1.GetProfileRepository();
    }
    async getProfile(userId) {
        const user = await this.repo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: "**************",
            contact_number: user.contact_number,
            date_of_birth: user.date_of_birth,
            address: user.address,
            gender: user.gender,
            emergency_contact: user.emergency_contact,
            emergency_contact_number: user.emergency_contact_number,
            role: user.role_name,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
    }
}
exports.GetProfileService = GetProfileService;
