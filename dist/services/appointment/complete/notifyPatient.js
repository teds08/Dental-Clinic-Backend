"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyPatient = void 0;
const index_1 = require("../../../repositories/notification/index");
const notifyPatient = async (client, userId, notificationMessage) => {
    const notificationRepo = new index_1.CreateNotificationRepository(client);
    await notificationRepo.create(userId, "Appointment Completed", notificationMessage);
};
exports.notifyPatient = notifyPatient;
