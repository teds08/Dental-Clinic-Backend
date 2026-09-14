"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkNotificationReadService = void 0;
const index_1 = require("../../repositories/notification/index");
class MarkNotificationReadService {
    constructor() {
        this.repo = new index_1.MarkNotificationReadRepository();
    }
    async mark(notificationId, userId) {
        const notification = await this.repo.markAsRead(notificationId, userId);
        if (!notification) {
            throw new Error("Notification not found.");
        }
        return notification;
    }
}
exports.MarkNotificationReadService = MarkNotificationReadService;
