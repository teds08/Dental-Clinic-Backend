"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUser = void 0;
const index_1 = require("../../../services/admin/index");
const softDeleteService = new index_1.SoftDeleteUserAdminService();
const softDeleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await softDeleteService.softDeleteUser(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User soft deleted successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.softDeleteUser = softDeleteUser;
