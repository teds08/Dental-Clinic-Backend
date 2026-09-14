"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const index_1 = require("../../../services/user/index");
const getProfileService = new index_1.GetProfileService();
const profile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProfile = await getProfileService.getProfile(userId);
        return res.status(200).json({
            message: "Profile fetched successfully",
            data: userProfile,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.profile = profile;
