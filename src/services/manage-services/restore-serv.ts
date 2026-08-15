import { RestoreServiceRepository } from "../../repositories/manage-services/index";

export class RestoreService {

  private repo = new RestoreServiceRepository();

  async restoreService(id: number) {


    const result = await this.repo.restore(id);

    if (!result) {
      throw new Error("Service not found or already active");
    }

    return {
      message: "Service restored successfully",
      service: result
    };
  }
}