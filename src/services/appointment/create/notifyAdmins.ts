import { CreateNotificationRepository } from "../../../repositories/notification/index";

export const notifyAdmins = async (
  client: any,
  admins: any[],
  message: string
): Promise<void> => {
  const notificationRepo = new CreateNotificationRepository(client);

  for (const admin of admins) {
    await notificationRepo.create(admin.id, "New Appointment", message);
  }
};