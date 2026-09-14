"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardDeleteUser = void 0;
const index_1 = require("../../../services/admin/index");
const hardDeleteService = new index_1.HardDeleteUserAdminService();
const hardDeleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await hardDeleteService.hardDeleteUser(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User permanently deleted",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.hardDeleteUser = hardDeleteUser;
