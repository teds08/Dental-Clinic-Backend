import { CreateNotificationRepository } from "../../../repositories/notification/index";

export const notifyPatient = async (
  client: any,
  userId: number,
  notificationMessage: string
) => {
  const notificationRepository = new CreateNotificationRepository(client);

  await notificationRepository.create(
    userId,
    "Coupon Redeemed",
    notificationMessage
  );
};