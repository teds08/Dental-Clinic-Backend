"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../../../repositories/user/index");
const authRepo = new index_1.AuthenticatedPasswordChangeRepository();
const findByIdRepo = new index_1.FindByIdRepository();
class ChangePasswordService {
    async execute(userId, currentPassword, newPassword, confirmPassword) {
        // Validate user exists
        const user = await findByIdRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Check if OTP verification is done
        if (!user.password_change_verified) {
            throw new Error("OTP verification required");
        }
        // Validate current password
        const isMatch = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }
        // Validate new passwords match
        if (newPassword !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        // Hash new password
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        // Update password
        await authRepo.updatePassword(user.id, hashedPassword);
        // Clear verification
        await authRepo.clearPasswordChangeVerification(userId);
        return { message: "Password changed successfully" };
    }
}
exports.ChangePasswordService = ChangePasswordService;
