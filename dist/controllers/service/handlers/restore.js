"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restore = void 0;
const index_1 = require("../../../services/manage-services/index");
const restoreService = new index_1.RestoreService();
const restore = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await restoreService.restoreService(id);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.restore = restore;
