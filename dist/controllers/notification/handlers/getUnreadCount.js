"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadCount = void 0;
const index_1 = require("../../../services/notification/index");
const unreadNotificationCountService = new index_1.UnreadNotificationCountService();
const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await unreadNotificationCountService.getCount(userId);
        return res.status(200).json({
            message: "Unread notification count retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getUnreadCount = getUnreadCount;
