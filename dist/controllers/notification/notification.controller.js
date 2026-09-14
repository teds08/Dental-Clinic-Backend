"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const getMyNotifications_1 = require("./handlers/getMyNotifications");
const getUnreadCount_1 = require("./handlers/getUnreadCount");
const markAsRead_1 = require("./handlers/markAsRead");
const markAllAsRead_1 = require("./handlers/markAllAsRead");
const delete_notify_1 = require("./handlers/delete.notify");
class NotificationController {
    async getMyNotifications(req, res) {
        return (0, getMyNotifications_1.getMyNotifications)(req, res);
    }
    async getUnreadCount(req, res) {
        return (0, getUnreadCount_1.getUnreadCount)(req, res);
    }
    async markAsRead(req, res) {
        return (0, markAsRead_1.markAsRead)(req, res);
    }
    async markAllAsRead(req, res) {
        return (0, markAllAsRead_1.markAllAsRead)(req, res);
    }
    async deleteNotification(req, res) {
        return (0, delete_notify_1.deleteNotification)(req, res);
    }
}
exports.NotificationController = NotificationController;
