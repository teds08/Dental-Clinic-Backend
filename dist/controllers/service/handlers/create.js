"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const index_1 = require("../../../services/manage-services/index");
const admin_service_validator_1 = require("../../../validators/admin.service.validator");
const createService = new index_1.CreateService();
const create = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Service image is required.",
            });
        }
        const validatedData = admin_service_validator_1.CreateServiceValidator.parse({
            ...req.body,
            price: Number(req.body.price),
            points: Number(req.body.points),
            duration_minutes: Number(req.body.duration_minutes),
        });
        const result = await createService.createService(validatedData, req.file.buffer);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.errors || error.message,
        });
    }
};
exports.create = create;
