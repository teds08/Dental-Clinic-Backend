"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAllNotificationsReadService = void 0;
const index_1 = require("../../repositories/notification/index");
class MarkAllNotificationsReadService {
    constructor() {
        this.repo = new index_1.MarkAllNotificationsReadRepository();
    }
    async markAll(userId) {
        const updated = await this.repo.markAll(userId);
        return {
            updated
        };
    }
}
exports.MarkAllNotificationsReadService = MarkAllNotificationsReadService;
