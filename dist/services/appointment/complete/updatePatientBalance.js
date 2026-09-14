"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientBalance = void 0;
const index_1 = require("../../../repositories/manage-patient-points/index");
const updatePatientBalance = async (client, userId, balanceAfter) => {
    const patientPointsRepo = new index_1.UpdatePatientPointsRepository(client);
    await patientPointsRepo.updateBalance(userId, balanceAfter);
};
exports.updatePatientBalance = updatePatientBalance;
