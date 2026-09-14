"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNotificationService = void 0;
const notification_1 = require("../../repositories/notification");
class DeleteNotificationService {
    constructor() {
        this.repo = new notification_1.DeleteNotificationRepository();
    }
    async deleteNotification(notificationId, userId) {
        return await this.repo.deleteNotification(notificationId, userId);
    }
}
exports.DeleteNotificationService = DeleteNotificationService;
