"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllAsRead = void 0;
const index_1 = require("../../../services/notification/index");
const markAllNotificationsReadService = new index_1.MarkAllNotificationsReadService();
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await markAllNotificationsReadService.markAll(userId);
        return res.status(200).json({
            message: "All notifications marked as read.",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.markAllAsRead = markAllAsRead;
