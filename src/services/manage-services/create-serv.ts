import { CreateServiceRepository } from "../../repositories/manage-services/index";
import { IService } from "../../interfaces/service.interface";

export class CreateService {
  private repo = new CreateServiceRepository();

  async createService(data: IService) {
    const result = await this.repo.create(data);

    console.log("Service created successfully:", result);
    return {
      message: "Service created successfully",
      service: result,
    };
  }
}
