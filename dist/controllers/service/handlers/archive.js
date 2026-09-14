"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archive = void 0;
const index_1 = require("../../../services/manage-services/index");
const softDeleteService = new index_1.SoftDeleteService();
const archive = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await softDeleteService.deleteService(id);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.archive = archive;
