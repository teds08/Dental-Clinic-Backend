"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = void 0;
const createNotificationMessage = (appointment, earnedPoints) => {
    return `Your appointment has been completed successfully.

Service:
${appointment.title}
Original Amount:
₱${Number(appointment.original_amount).toFixed(2)}
Discount:
₱${Number(appointment.discount_amount).toFixed(2)}
Final Amount:
₱${Number(appointment.final_amount).toFixed(2)}
Reward Points Earned:
${earnedPoints}

Thank you for choosing our dental clinic.`;
};
exports.createNotificationMessage = createNotificationMessage;
