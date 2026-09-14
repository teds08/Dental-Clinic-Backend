"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const getAllUsers_1 = require("./handlers/getAllUsers");
const softDeleteUser_1 = require("./handlers/softDeleteUser");
const hardDeleteUser_1 = require("./handlers/hardDeleteUser");
const restoreUser_1 = require("./handlers/restoreUser");
const createUser_1 = require("./handlers/createUser");
const getArchivedUsers_1 = require("./handlers/getArchivedUsers");
const admin_dashboard_1 = require("./handlers/admin-dashboard");
class AdminController {
    async getAll(req, res) {
        return (0, getAllUsers_1.getAllUsers)(req, res);
    }
    async softDelete(req, res) {
        return (0, softDeleteUser_1.softDeleteUser)(req, res);
    }
    async hardDelete(req, res) {
        return (0, hardDeleteUser_1.hardDeleteUser)(req, res);
    }
    async restore(req, res) {
        return (0, restoreUser_1.restoreUser)(req, res);
    }
    async adminCreate(req, res) {
        return (0, createUser_1.createUser)(req, res);
    }
    async findArchivedUsers(req, res) {
        return (0, getArchivedUsers_1.getArchivedUsers)(req, res);
    }
    async getDashboard(req, res) {
        return (0, admin_dashboard_1.getDashboard)(req, res);
    }
}
exports.AdminController = AdminController;
