"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const index_1 = require("../../../services/admin/index");
const admin_service_validator_1 = require("../../../validators/admin.service.validator");
const adminCreateUserService = new index_1.AdminCreateUserService();
const createUser = async (req, res) => {
    try {
        const validated = admin_service_validator_1.adminCreateUserValidator.parse(req.body);
        const user = await adminCreateUserService.adminCreateUser(validated);
        return res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createUser = createUser;
