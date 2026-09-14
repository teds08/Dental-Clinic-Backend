"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientBalance = void 0;
const index_1 = require("../../../repositories/manage-patient-points/index");
const updatePatientBalance = async (client, userId, newBalance) => {
    const updatePointsRepository = new index_1.UpdatePatientPointsRepository(client);
    await updatePointsRepository.updateBalance(userId, newBalance);
};
exports.updatePatientBalance = updatePatientBalance;
