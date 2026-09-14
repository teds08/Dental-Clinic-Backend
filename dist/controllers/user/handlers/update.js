"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const index_1 = require("../../../services/user/index");
const user_validator_1 = require("../../../validators/user.validator");
const updateUserService = new index_1.UpdateUserService();
const update = async (req, res) => {
    try {
        const userId = req.user.id;
        const validated = user_validator_1.updateProfileValidator.parse(req.body);
        const updatedUser = await updateUserService.updateUser(userId, validated);
        return res.status(200).json({
            message: "Profile updated successfully.",
            data: updatedUser,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.update = update;
