"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = void 0;
const index_1 = require("../../../services/admin/index");
const restoreUserService = new index_1.RestoreUserAdminService();
const restoreUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await restoreUserService.restoreUser(id);
        return res.status(200).json({
            message: "User restored successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
exports.restoreUser = restoreUser;
