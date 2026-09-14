"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = void 0;
const index_1 = require("../../../services/notification/index");
const markNotificationReadService = new index_1.MarkNotificationReadService();
const markAsRead = async (req, res) => {
    try {
        const notificationId = Number(req.params.id);
        const userId = req.user.id;
        const notification = await markNotificationReadService.mark(notificationId, userId);
        return res.status(200).json({
            message: "Notification marked as read.",
            data: notification,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
exports.markAsRead = markAsRead;
