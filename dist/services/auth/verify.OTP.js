"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpAuthService = void 0;
const index_1 = require("../../repositories/auth/index");
const index_2 = require("../../repositories/user/index");
class VerifyOtpAuthService {
    constructor() {
        this.sessionRepository = new index_1.SessionRepository();
        this.findEmailUserRepository = new index_2.FindEmailUserRepository();
        this.forgotPasswordRepository = new index_1.ForgotPasswordRepository();
    }
    async verifyOtp(sessionId, otp) {
        const session = await this.sessionRepository.getSession(sessionId);
        if (!session)
            throw new Error("Session not found or expired");
        const user = await this.findEmailUserRepository.findByEmail(session.email);
        if (!user)
            throw new Error("User not found");
        if (user.locked_until && new Date(user.locked_until) > new Date()) {
            throw new Error("Too many attempts. Try again later");
        }
        if (user.otp_expires_at &&
            new Date(user.otp_expires_at) < new Date()) {
            throw new Error("OTP expired");
        }
        if (user.otp_code !== otp) {
            await this.forgotPasswordRepository.incrementOtpAttempts(user.email);
            const attempts = (user.otp_attempts ?? 0) + 1;
            if (attempts >= 5) {
                await this.forgotPasswordRepository.lockUser(user.email);
            }
            throw new Error("Invalid OTP");
        }
        await this.forgotPasswordRepository.verifySession(sessionId);
    }
}
exports.VerifyOtpAuthService = VerifyOtpAuthService;
