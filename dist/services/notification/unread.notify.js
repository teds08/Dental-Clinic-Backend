"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadNotificationCountService = void 0;
const index_1 = require("../../repositories/notification/index");
class UnreadNotificationCountService {
    constructor() {
        this.repo = new index_1.UnreadNotificationCountRepository();
    }
    async getCount(userId) {
        return await this.repo.count(userId);
    }
}
exports.UnreadNotificationCountService = UnreadNotificationCountService;
