"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNotificationsService = void 0;
const index_1 = require("../../repositories/notification/index");
class FindNotificationsService {
    constructor() {
        this.repo = new index_1.FindNotificationsRepository();
    }
    async getNotifications(userId) {
        return await this.repo.findByUserId(userId);
    }
}
exports.FindNotificationsService = FindNotificationsService;
