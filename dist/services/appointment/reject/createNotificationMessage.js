"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = void 0;
const createNotificationMessage = (appointment, formattedDate, formattedTime, couponWasUsed, couponConflictDetected) => {
    return `Unfortunately, your appointment could not be approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}

${couponConflictDetected
        ? `Coupon Conflict Detected.
There was a problem with the coupon associated with this appointment.`
        : couponWasUsed
            ? `Your coupon has been returned to your coupon inventory.`
            : ``}
Please contact the clinic or book another available schedule.`;
};
exports.createNotificationMessage = createNotificationMessage;
