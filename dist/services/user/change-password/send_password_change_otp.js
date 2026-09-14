"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPasswordChangeOTPService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const node_mailer_1 = require("../../../config/node_mailer");
const index_1 = require("../../../repositories/user/index");
const authRepo = new index_1.AuthenticatedPasswordChangeRepository();
const findByIdRepo = new index_1.FindByIdRepository();
class SendPasswordChangeOTPService {
    async execute(userId) {
        // Validate user exists
        const user = await findByIdRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Generate OTP
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        // Save OTP
        await authRepo.savePasswordChangeOTP(userId, otp, expiresAt);
        // Send email
        await node_mailer_1.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Change OTP",
            html: `
        <h1>${otp}</h1>
        <p>Expires in 10 minutes.</p>
      `,
        });
        return { message: "OTP sent successfully" };
    }
}
exports.SendPasswordChangeOTPService = SendPasswordChangeOTPService;
