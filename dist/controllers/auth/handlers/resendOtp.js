"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = void 0;
const index_1 = require("../../../services/auth/index");
const resendOtpAuthService = new index_1.ResendOtpAuthService();
const resendOtp = async (req, res) => {
    try {
        const sessionId = req.headers["x-session-id"];
        const result = await resendOtpAuthService.resendOtp(sessionId);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.resendOtp = resendOtp;
