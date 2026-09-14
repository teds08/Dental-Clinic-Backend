"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateUserService = void 0;
const index_1 = require("../../repositories/user/index");
const password_bcrypt_1 = require("../../utils/password.bcrypt");
class AdminCreateUserService {
    constructor() {
        this.repo = new index_1.CreateUserRepository();
    }
    async adminCreateUser(data) {
        const hashedPassword = await (0, password_bcrypt_1.hashPassword)(data.password);
        return await this.repo.create({
            ...data,
            password: hashedPassword
        });
    }
}
exports.AdminCreateUserService = AdminCreateUserService;
