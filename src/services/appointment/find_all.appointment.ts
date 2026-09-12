import { FindAllAppointmentsRepository } from "../../repositories/appointment/index";

export class FindAllAppointmentsService {
  private repo = new FindAllAppointmentsRepository();

  async getAppointments(status?: string, page = 1, limit = 10) {
    return await this.repo.getAll(status, page, limit);
  }
}
