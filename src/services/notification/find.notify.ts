import {FindNotificationsRepository} from "../../repositories/notification/index";


export class FindNotificationsService {

  private repo = new FindNotificationsRepository();

  async getNotifications(userId: number) {

    return await this.repo.findByUserId(userId);

  }

}