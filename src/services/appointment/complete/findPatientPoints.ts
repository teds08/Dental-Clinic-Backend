import { FindPatientPointsRepository } from "../../../repositories/manage-patient-points/index";

export const findPatientPoints = async (client: any, userId: number) => {
  const findPatientPointsRepo = new FindPatientPointsRepository(client);
  const patientPoints = await findPatientPointsRepo.findByUserId(userId);

  if (!patientPoints) {
    throw new Error("Patient reward points record not found.");
  }

  return patientPoints;
};