"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyNotifications = void 0;
const index_1 = require("../../../services/notification/index");
const findNotificationsService = new index_1.FindNotificationsService();
const getMyNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await findNotificationsService.getNotifications(userId);
        return res.status(200).json({
            message: "Notifications retrieved successfully.",
            data: notifications,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getMyNotifications = getMyNotifications;
