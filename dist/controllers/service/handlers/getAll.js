"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const index_1 = require("../../../services/manage-services/index");
const getAllServiceService = new index_1.GetAllServiceService();
const getAll = async (req, res) => {
    try {
        const result = await getAllServiceService.getAllServices();
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.getAll = getAll;
