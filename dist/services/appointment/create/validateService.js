"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateService = void 0;
const index_1 = require("../../../repositories/manage-services/index");
const validateService = async (serviceId) => {
    const serviceRepo = new index_1.FindServiceRepository();
    const service = await serviceRepo.findById(serviceId);
    if (!service) {
        throw new Error("Selected service does not exist.");
    }
    return service;
};
exports.validateService = validateService;
