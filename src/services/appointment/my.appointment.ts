import {FindMyAppointmentsRepository} from "../../repositories/appointment/index";

export class FindMyAppointmentsService {

  private repo = new FindMyAppointmentsRepository();

  async getAppointments(userId: number) {

    return await this.repo.getByUserId(userId);

  }

}