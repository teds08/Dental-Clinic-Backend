"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const create_1 = require("./handlers/create");
const update_1 = require("./handlers/update");
const archive_1 = require("./handlers/archive");
const restore_1 = require("./handlers/restore");
const archiveList_1 = require("./handlers/archiveList");
const getAll_1 = require("./handlers/getAll");
const hardDelete_1 = require("./handlers/hardDelete");
class ServiceController {
    async create(req, res) {
        return (0, create_1.create)(req, res);
    }
    async update(req, res) {
        return (0, update_1.update)(req, res);
    }
    async archive(req, res) {
        return (0, archive_1.archive)(req, res);
    }
    async restore(req, res) {
        return (0, restore_1.restore)(req, res);
    }
    async archiveList(req, res) {
        return (0, archiveList_1.archiveList)(req, res);
    }
    async getAll(req, res) {
        return (0, getAll_1.getAll)(req, res);
    }
    async hardDelete(req, res) {
        return (0, hardDelete_1.hardDelete)(req, res);
    }
}
exports.ServiceController = ServiceController;
