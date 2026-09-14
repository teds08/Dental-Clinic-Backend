"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = void 0;
const createNotificationMessage = (appointment, formattedDate, formattedTime) => {
    return `Your appointment has been approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}

Please arrive at least 15 minutes before your appointment.`;
};
exports.createNotificationMessage = createNotificationMessage;
