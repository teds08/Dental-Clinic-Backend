import { SoftDeleteServiceRepository } from "../../repositories/manage-services/index";


export class SoftDeleteService {

  private repo = new SoftDeleteServiceRepository();

  async deleteService(id: number) {


    const result = await this.repo.softDelete(id);

    if (!result) {
      throw new Error("Service not found or already archived");
    }

    return {
      message: "Service archived successfully",
      result
    };
  }
}