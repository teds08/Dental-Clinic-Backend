"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAuthService = void 0;
const index_1 = require("../../repositories/user/index");
const password_bcrypt_1 = require("../../utils/password.bcrypt");
const jwt_1 = require("../../utils/jwt");
class LoginAuthService {
    constructor() {
        this.findEmailUserRepository = new index_1.FindEmailUserRepository();
        this.failedAttemptsUserRepository = new index_1.FailedAttemptsUserRepository();
        this.lockUserRepository = new index_1.LockUserRepository();
        this.resetAttemptsUserRepository = new index_1.ResetAttemptsUserRepository();
    }
    async login(email, password) {
        const user = await this.findEmailUserRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        // Check cool down
        if (user.locked_until &&
            new Date(user.locked_until) > new Date()) {
            throw new Error("Too many login attempts. Try again in 5 minutes.");
        }
        const isMatch = await (0, password_bcrypt_1.comparePassword)(password, user.password);
        if (!isMatch) {
            await this.failedAttemptsUserRepository.incrementFailedAttempts(user.id);
            const updatedUser = await this.findEmailUserRepository.findByEmail(email);
            if (updatedUser.failed_login_attempts >= 5) {
                await this.lockUserRepository.lockAccount(user.id);
                throw new Error("Account locked for 5 minutes due to multiple failed login attempts.");
            }
            throw new Error("Invalid credentials");
        }
        await this.resetAttemptsUserRepository.resetLoginAttempts(user.id);
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            role_id: user.role_id
        });
        return { token };
    }
}
exports.LoginAuthService = LoginAuthService;
