"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdmins = void 0;
const index_1 = require("../../../repositories/notification/index");
const notifyAdmins = async (client, admins, appointment, formattedDate, formattedTime) => {
    const notificationRepo = new index_1.CreateNotificationRepository(client);
    for (const admin of admins) {
        await notificationRepo.create(admin.id, "Appointment Cancelled", `A patient cancelled an appointment.

Patient:
${appointment.first_name} ${appointment.last_name}
Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}`);
    }
};
exports.notifyAdmins = notifyAdmins;
