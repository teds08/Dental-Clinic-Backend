"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const login_1 = require("./handlers/login");
const requestOtp_1 = require("./handlers/requestOtp");
const verifyOtp_1 = require("./handlers/verifyOtp");
const resetPassword_1 = require("./handlers/resetPassword");
const resendOtp_1 = require("./handlers/resendOtp");
class AuthController {
    async login(req, res) {
        return (0, login_1.login)(req, res);
    }
    async requestOtp(req, res) {
        return (0, requestOtp_1.requestOtp)(req, res);
    }
    async verifyOtp(req, res) {
        return (0, verifyOtp_1.verifyOtp)(req, res);
    }
    async resetPassword(req, res) {
        return (0, resetPassword_1.resetPassword)(req, res);
    }
    async resendOtp(req, res) {
        return (0, resendOtp_1.resendOtp)(req, res);
    }
}
exports.AuthController = AuthController;
