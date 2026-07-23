import {CreateNotificationRepository} from "../../repositories/notification/index";

export class CreateNotificationService {

  private repo = new CreateNotificationRepository();

  async create( userId: number, title: string, message: string) {

    return await this.repo.create(
      userId,
      title,
      message
    );

  }

}