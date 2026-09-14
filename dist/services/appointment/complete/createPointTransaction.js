"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPointTransaction = void 0;
const index_1 = require("../../../repositories/manage-patient-points/index");
const createPointTransaction = async (client, appointment, earnedPoints, balanceBefore, balanceAfter) => {
    // Only create transaction if no coupon was used
    if (appointment.patient_coupon_id === null && appointment.coupon_id === null) {
        const pointTransactionRepo = new index_1.CreatePointTransactionRepository(client);
        await pointTransactionRepo.create(appointment.user_id, appointment.id, earnedPoints, balanceBefore, balanceAfter, `Reward points earned from ${appointment.title}`);
    }
};
exports.createPointTransaction = createPointTransaction;
