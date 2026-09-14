"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyPatient = void 0;
const index_1 = require("../../../repositories/notification/index");
const notifyPatient = async (client, userId, notificationMessage) => {
    const notificationRepository = new index_1.CreateNotificationRepository(client);
    await notificationRepository.create(userId, "Coupon Redeemed", notificationMessage);
};
exports.notifyPatient = notifyPatient;
