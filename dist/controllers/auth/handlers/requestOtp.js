"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = void 0;
const index_1 = require("../../../services/auth/index");
const forgotPasswordAuthService = new index_1.ForgotPasswordAuthService();
const requestOtp = async (req, res) => {
    try {
        const result = await forgotPasswordAuthService.requestOtp(req.body.email);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.requestOtp = requestOtp;
