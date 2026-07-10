import {FindAllAppointmentsRepository} from "../../repositories/appointment/index";

export class FindAllAppointmentsService {

  private repo = new FindAllAppointmentsRepository();

  async getAppointments() {

    return await this.repo.getAll();

  }

}