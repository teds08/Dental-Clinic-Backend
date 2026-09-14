"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordAuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../../repositories/auth/index");
class ResetPasswordAuthService {
    constructor() {
        this.forgotPasswordRepository = new index_1.ForgotPasswordRepository();
        this.sessionRepository = new index_1.SessionRepository();
    }
    async resetPassword(sessionId, input) {
        const { new_password, confirm_password } = input;
        if (new_password !== confirm_password) {
            throw new Error("Passwords do not match");
        }
        const session = await this.sessionRepository.getSession(sessionId);
        if (!session)
            throw new Error("Session not found or expired");
        if (!session.otp_verified)
            throw new Error("OTP not verified");
        const hashed = await bcrypt_1.default.hash(new_password, 10);
        await this.forgotPasswordRepository.updatePassword(session.email, hashed);
        await this.sessionRepository.deleteSession(sessionId);
    }
}
exports.ResetPasswordAuthService = ResetPasswordAuthService;
