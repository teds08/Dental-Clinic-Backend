"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const index_1 = require("../../../services/admin/index");
const findAllService = new index_1.FindAllUserAdminService();
const getAllUsers = async (req, res) => {
    try {
        const users = await findAllService.getUsers();
        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
