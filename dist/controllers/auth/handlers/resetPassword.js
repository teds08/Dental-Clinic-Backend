"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const index_1 = require("../../../services/auth/index");
const resetPassword_validation_1 = require("../../../validators/resetPassword.validation");
const resetPasswordAuthService = new index_1.ResetPasswordAuthService();
const resetPassword = async (req, res) => {
    try {
        const sessionId = req.headers["x-session-id"];
        if (!sessionId) {
            return res.status(400).json({ message: "Missing x-session-id header" });
        }
        const parsed = resetPassword_validation_1.resetPasswordSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            });
        }
        await resetPasswordAuthService.resetPassword(sessionId, parsed.data);
        return res.status(200).json({
            message: "Password changed successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.resetPassword = resetPassword;
