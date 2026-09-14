"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOtpAuthService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const node_mailer_1 = require("../../config/node_mailer");
const index_1 = require("../../repositories/auth/index");
const index_2 = require("../../repositories/user/index");
class ResendOtpAuthService {
    constructor() {
        this.forgotPasswordRepository = new index_1.ForgotPasswordRepository();
        this.sessionRepository = new index_1.SessionRepository();
        this.userRepository = new index_2.FindEmailUserRepository();
    }
    async resendOtp(sessionId) {
        const session = await this.sessionRepository.getSession(sessionId);
        if (!session) {
            throw new Error("Session not found or expired");
        }
        if (new Date(session.expires_at) < new Date()) {
            throw new Error("Session not found or expired");
        }
        const user = await this.userRepository.findByEmail(session.email);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.otp_resend_available_at &&
            new Date(user.otp_resend_available_at) > new Date()) {
            throw new Error("Please wait 5 minutes before requesting another OTP");
        }
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const resendAvailableAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.forgotPasswordRepository.updateOTP(user.email, otp, otpExpiresAt, resendAvailableAt);
        await node_mailer_1.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Resend OTP",
            html: `
<div style="font-family:monospace;max-width:380px;margin:40px auto;padding:32px;background:#111;border-radius:12px;text-align:center;">
  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;color:#666;text-transform:uppercase;">Your verification code</p>
  <h1 style="margin:0 0 24px;font-size:48px;font-weight:700;color:#fff;letter-spacing:0.1em;">${otp}</h1>
  <p style="margin:0;font-size:13px;color:#555;">Expires in <span style="color:#aaa;">10 minutes</span></p>
</div>
`
        });
        return {
            message: "OTP sent successfully"
        };
    }
}
exports.ResendOtpAuthService = ResendOtpAuthService;
