"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const index_1 = require("../../../services/user/index");
const user_validator_1 = require("../../../validators/user.validator");
const createUserService = new index_1.CreateUserService();
const register = async (req, res) => {
    try {
        const validated = user_validator_1.registerValidator.parse(req.body);
        const user = await createUserService.register({
            ...validated,
            password: validated.password,
        });
        return res.status(201).json({
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.register = register;
