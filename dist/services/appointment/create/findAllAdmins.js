"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAdmins = void 0;
const index_1 = require("../../../repositories/admin/index");
const findAllAdmins = async () => {
    const adminRepo = new index_1.FindAdminsRepository();
    return await adminRepo.findAll();
};
exports.findAllAdmins = findAllAdmins;
