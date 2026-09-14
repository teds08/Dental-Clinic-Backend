"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const register_1 = require("./handlers/register");
const update_1 = require("./handlers/update");
const profile_1 = require("./handlers/profile");
const sendOTP_1 = require("./handlers/sendOTP");
const verifyOTP_1 = require("./handlers/verifyOTP");
const changePassword_1 = require("./handlers/changePassword");
const resendOTP_1 = require("./handlers/resendOTP");
class UserController {
    async register(req, res) {
        return (0, register_1.register)(req, res);
    }
    async update(req, res) {
        return (0, update_1.update)(req, res);
    }
    async profile(req, res) {
        return (0, profile_1.profile)(req, res);
    }
    async sendOTP(req, res) {
        return (0, sendOTP_1.sendOTP)(req, res);
    }
    async verifyOTP(req, res) {
        return (0, verifyOTP_1.verifyOTP)(req, res);
    }
    async changePassword(req, res) {
        return (0, changePassword_1.changePassword)(req, res);
    }
    async resendOTP(req, res) {
        return (0, resendOTP_1.resendOTP)(req, res);
    }
}
exports.UserController = UserController;
