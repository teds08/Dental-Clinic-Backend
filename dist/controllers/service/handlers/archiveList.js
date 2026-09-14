"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveList = void 0;
const index_1 = require("../../../services/manage-services/index");
const archiveListService = new index_1.ArchiveListService();
const archiveList = async (req, res) => {
    try {
        const result = await archiveListService.getArchivedServices();
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.archiveList = archiveList;
