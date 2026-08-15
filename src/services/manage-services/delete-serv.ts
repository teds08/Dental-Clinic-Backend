import cloudinary from "../../config/cloudinary";
import { DeletePermanentRepository, FindServiceRepository } from "../../repositories/manage-services/index";

export class DeletePermanentService {

  private repo = new DeletePermanentRepository();
  private findRepo = new FindServiceRepository();

  async deleteService(id: number) {

    const service = await this.findRepo.findById(id);

    if (!service) {
      throw new Error("Service not found");
    }

    
    if (service.image_public_id) {
      await cloudinary.uploader.destroy(service.image_public_id);
    }

    const deleted = await this.repo.delete(id);

    return {
      message: "Service permanently deleted",
      service: deleted
    };
  }
}