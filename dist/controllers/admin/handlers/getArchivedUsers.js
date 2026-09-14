"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchivedUsers = void 0;
const index_1 = require("../../../services/admin/index");
const findArchiveUsersService = new index_1.FindArchiveUsersService();
const getArchivedUsers = async (req, res) => {
    try {
        const result = await findArchiveUsersService.getArchivedUsers();
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.getArchivedUsers = getArchivedUsers;
