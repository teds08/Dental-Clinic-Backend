"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const index_1 = require("../../repositories/user/index");
const password_bcrypt_1 = require("../../utils/password.bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CreateUserService {
    constructor() {
        this.repo = new index_1.CreateUserRepository();
    }
    async register(data) {
        const hashedPassword = await (0, password_bcrypt_1.hashPassword)(data.password);
        const user = await this.repo.create({
            ...data,
            password: hashedPassword,
            role_id: 2,
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role_id: user.role_id,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                contact_number: user.contact_number,
                role_id: user.role_id,
            },
            token,
        };
    }
}
exports.CreateUserService = CreateUserService;
