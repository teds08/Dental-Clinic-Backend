import { CreatePointTransactionRepository } from "../../../repositories/manage-patient-points/index";

export const recordRedemptionTransaction = async (
  client: any,
  userId: number,
  coupon: any,
  currentBalance: number,
  newBalance: number
) => {
  const pointTransactionRepository = new CreatePointTransactionRepository(client);

  await pointTransactionRepository.createRedeemTransaction(
    userId,
    coupon.id,
    coupon.required_points,
    currentBalance,
    newBalance,
    `Redeemed ${coupon.name}`
  );
};