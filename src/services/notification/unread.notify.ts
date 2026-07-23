import {UnreadNotificationCountRepository} from "../../repositories/notification/index";

export class UnreadNotificationCountService {

  private repo = new UnreadNotificationCountRepository();

  async getCount(userId: number) {

    return await this.repo.count(userId);

  }

}