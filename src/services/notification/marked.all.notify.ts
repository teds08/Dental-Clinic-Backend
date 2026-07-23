import {MarkAllNotificationsReadRepository} from "../../repositories/notification/index";

export class MarkAllNotificationsReadService {

  private repo = new MarkAllNotificationsReadRepository();

  async markAll(userId: number) {

    const updated = await this.repo.markAll(userId);

    return {
      updated
    };

  }

}