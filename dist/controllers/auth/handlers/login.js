"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const index_1 = require("../../../services/auth/index");
const auth_validator_1 = require("../../../validators/auth.validator");
const loginAuthService = new index_1.LoginAuthService();
const login = async (req, res) => {
    try {
        const validated = auth_validator_1.loginValidator.parse(req.body);
        const result = await loginAuthService.login(validated.email, validated.password);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};
exports.login = login;
