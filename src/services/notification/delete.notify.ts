import { DeleteNotificationRepository } from "../../repositories/notification";

export class DeleteNotificationService {
  private repo = new DeleteNotificationRepository();

  async deleteNotification(notificationId: number, userId: number) {
    return await this.repo.deleteNotification(notificationId, userId);
  }
}
