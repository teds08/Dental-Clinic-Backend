"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationService = void 0;
const index_1 = require("../../repositories/notification/index");
class CreateNotificationService {
    constructor() {
        this.repo = new index_1.CreateNotificationRepository();
    }
    async create(userId, title, message) {
        return await this.repo.create(userId, title, message);
    }
}
exports.CreateNotificationService = CreateNotificationService;
