import { UpdatePatientPointsRepository } from "../../../repositories/manage-patient-points/index";

export const updatePatientBalance = async (
  client: any,
  userId: number,
  newBalance: number
) => {
  const updatePointsRepository = new UpdatePatientPointsRepository(client);
  await updatePointsRepository.updateBalance(userId, newBalance);
};