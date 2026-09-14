"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPasswordChangeOTPService = void 0;
const index_1 = require("../../../repositories/user/index");
const authRepo = new index_1.AuthenticatedPasswordChangeRepository();
const findByIdRepo = new index_1.FindByIdRepository();
class VerifyPasswordChangeOTPService {
    async execute(userId, otp) {
        // Validate user exists
        const user = await findByIdRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Check OTP expiry
        if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
            throw new Error("OTP expired");
        }
        // Validate OTP code
        if (user.otp_code !== otp) {
            throw new Error("Invalid OTP");
        }
        // Mark as verified
        await authRepo.verifyPasswordChangeOTP(userId);
        return { message: "OTP verified" };
    }
}
exports.VerifyPasswordChangeOTPService = VerifyPasswordChangeOTPService;
