"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPatientPoints = void 0;
const index_1 = require("../../../repositories/manage-patient-points/index");
const findPatientPoints = async (client, userId) => {
    const findPatientPointsRepo = new index_1.FindPatientPointsRepository(client);
    const patientPoints = await findPatientPointsRepo.findByUserId(userId);
    if (!patientPoints) {
        throw new Error("Patient reward points record not found.");
    }
    return patientPoints;
};
exports.findPatientPoints = findPatientPoints;
