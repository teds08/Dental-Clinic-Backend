import { CreateNotificationRepository } from "../../../repositories/notification/index";

export const notifyPatient = async (
  client: any,
  userId: number,
  notificationMessage: string
) => {
  const notificationRepo = new CreateNotificationRepository(client);

  await notificationRepo.create(
    userId,
    "Appointment Completed",
    notificationMessage
  );
};