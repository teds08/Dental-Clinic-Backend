"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdmins = void 0;
const index_1 = require("../../../repositories/notification/index");
const notifyAdmins = async (client, admins, message) => {
    const notificationRepo = new index_1.CreateNotificationRepository(client);
    for (const admin of admins) {
        await notificationRepo.create(admin.id, "New Appointment", message);
    }
};
exports.notifyAdmins = notifyAdmins;
