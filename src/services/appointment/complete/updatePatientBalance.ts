import { UpdatePatientPointsRepository } from "../../../repositories/manage-patient-points/index";

export const updatePatientBalance = async (
  client: any,
  userId: number,
  balanceAfter: number
) => {
  const patientPointsRepo = new UpdatePatientPointsRepository(client);
  await patientPointsRepo.updateBalance(userId, balanceAfter);
};