import {MarkNotificationReadRepository} from "../../repositories/notification/index";


export class MarkNotificationReadService {

  private repo = new MarkNotificationReadRepository();

  async mark( notificationId: number, userId: number
  ) {

    const notification = await this.repo.markAsRead(notificationId, userId);

    if (!notification) {
      throw new Error("Notification not found.");
    }

    return notification;

  }

}