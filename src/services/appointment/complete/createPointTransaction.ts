import { CreatePointTransactionRepository } from "../../../repositories/manage-patient-points/index";

export const createPointTransaction = async (
  client: any,
  appointment: any,
  earnedPoints: number,
  balanceBefore: number,
  balanceAfter: number
): Promise<void> => {
  // Only create transaction if no coupon was used
  if (appointment.patient_coupon_id === null && appointment.coupon_id === null) {
    const pointTransactionRepo = new CreatePointTransactionRepository(client);

    await pointTransactionRepo.create(
      appointment.user_id,
      appointment.id,
      earnedPoints,
      balanceBefore,
      balanceAfter,
      `Reward points earned from ${appointment.title}`
    );
  }
};