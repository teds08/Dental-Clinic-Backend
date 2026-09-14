"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedPasswordChangeService = void 0;
const send_password_change_otp_1 = require("./send_password_change_otp");
const verify_password_change_otp_1 = require("./verify_password_change_otp");
const change_password_1 = require("./change_password");
const resend_otp_1 = require("./resend_otp");
class AuthenticatedPasswordChangeService {
    constructor() {
        this.sendOTPService = new send_password_change_otp_1.SendPasswordChangeOTPService();
        this.verifyOTPService = new verify_password_change_otp_1.VerifyPasswordChangeOTPService();
        this.changePasswordService = new change_password_1.ChangePasswordService();
        this.resendOTPService = new resend_otp_1.ResendOTPService();
    }
    async sendPasswordChangeOTP(userId) {
        return this.sendOTPService.execute(userId);
    }
    async verifyPasswordChangeOTP(userId, otp) {
        return this.verifyOTPService.execute(userId, otp);
    }
    async changePassword(userId, currentPassword, newPassword, confirmPassword) {
        return this.changePasswordService.execute(userId, currentPassword, newPassword, confirmPassword);
    }
    async resendOTP(userId) {
        return this.resendOTPService.execute(userId);
    }
}
exports.AuthenticatedPasswordChangeService = AuthenticatedPasswordChangeService;
