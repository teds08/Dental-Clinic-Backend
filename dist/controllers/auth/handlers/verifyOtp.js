"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const index_1 = require("../../../services/auth/index");
const verifyOtpAuthService = new index_1.VerifyOtpAuthService();
const verifyOtp = async (req, res) => {
    try {
        const sessionId = req.headers["x-session-id"];
        await verifyOtpAuthService.verifyOtp(sessionId, req.body.otp);
        return res.status(200).json({
            message: "OTP verified",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.verifyOtp = verifyOtp;
