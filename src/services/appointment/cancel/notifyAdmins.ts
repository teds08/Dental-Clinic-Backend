import { CreateNotificationRepository } from "../../../repositories/notification/index";

export const notifyAdmins = async (
  client: any,
  admins: any[],
  appointment: any,
  formattedDate: string,
  formattedTime: string
) => {
  const notificationRepo = new CreateNotificationRepository(client);

  for (const admin of admins) {
    await notificationRepo.create(
      admin.id,
      "Appointment Cancelled",
      `A patient cancelled an appointment.

Patient:
${appointment.first_name} ${appointment.last_name}
Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}`
    );
  }
};