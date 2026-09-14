"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordRedemptionTransaction = void 0;
const index_1 = require("../../../repositories/manage-patient-points/index");
const recordRedemptionTransaction = async (client, userId, coupon, currentBalance, newBalance) => {
    const pointTransactionRepository = new index_1.CreatePointTransactionRepository(client);
    await pointTransactionRepository.createRedeemTransaction(userId, coupon.id, coupon.required_points, currentBalance, newBalance, `Redeemed ${coupon.name}`);
};
exports.recordRedemptionTransaction = recordRedemptionTransaction;
