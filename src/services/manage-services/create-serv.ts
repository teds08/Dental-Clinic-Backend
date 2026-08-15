import { CreateServiceRepository } from "../../repositories/manage-services/index";
import { IService } from "../../interfaces/service.interface";

export class CreateService {

  private repo = new CreateServiceRepository();

   async createService(data: IService) {

    const result = await this.repo.create(data);

    return {
      message: "Service created successfully",
      service: result
    };
  }
}