"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordAuthService = void 0;
const index_1 = require("../../repositories/auth/index");
const index_2 = require("../../repositories/user/index");
const crypto_1 = __importDefault(require("crypto"));
const node_mailer_1 = require("../../config/node_mailer");
class ForgotPasswordAuthService {
    constructor() {
        this.findEmailUserRepository = new index_2.FindEmailUserRepository();
        this.forgotPasswordRepository = new index_1.ForgotPasswordRepository();
        this.sessionRepository = new index_1.SessionRepository();
    }
    async requestOtp(email) {
        const user = await this.findEmailUserRepository.findByEmail(email);
        if (!user)
            throw new Error("User not found");
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const sessionId = crypto_1.default.randomUUID();
        const expires = new Date(Date.now() + 10 * 60 * 1000);
        await this.forgotPasswordRepository.saveOTP(email, otp, expires);
        // Delete Old Sessions and Create New Session
        await this.sessionRepository.deleteOldSession(email);
        await this.sessionRepository.createSession(sessionId, email, expires);
        await node_mailer_1.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Code",
            html: `
<div style="font-family:monospace;max-width:380px;margin:40px auto;padding:32px;background:#111;border-radius:12px;text-align:center;">
  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;color:#666;text-transform:uppercase;">Your verification code</p>
  <h1 style="margin:0 0 24px;font-size:48px;font-weight:700;color:#fff;letter-spacing:0.1em;">${otp}</h1>
  <p style="margin:0;font-size:13px;color:#555;">Expires in <span style="color:#aaa;">10 minutes</span></p>
</div>
`
        });
        return { sessionId };
    }
}
exports.ForgotPasswordAuthService = ForgotPasswordAuthService;
