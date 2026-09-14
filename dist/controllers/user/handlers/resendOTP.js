"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = void 0;
const index_1 = require("../../../services/user/index");
const authenticatedPasswordChangeService = new index_1.AuthenticatedPasswordChangeService();
const resendOTP = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await authenticatedPasswordChangeService.resendOTP(userId);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.resendOTP = resendOTP;
