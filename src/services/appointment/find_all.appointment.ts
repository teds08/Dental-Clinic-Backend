import { FindAllAppointmentsRepository } from "../../repositories/appointment/index";

export class FindAllAppointmentsService {
  private repo = new FindAllAppointmentsRepository();

  async getAppointments(
    status?: string,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    return await this.repo.getAll(status, search, page, limit);
  }
}
