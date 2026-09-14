import cloudinary from "../../config/cloudinary";
import { DeletePermanentRepository } from "../../repositories/manage-services/index";

export class DeletePermanentService {
  private repo = new DeletePermanentRepository();

  async deleteService(id: number) {
    const service = await this.repo.findById(id);

    if (!service) {
      throw new Error("Service not found");
    }

    let deleted;

    try {
      deleted = await this.repo.delete(id);
    } catch (error: any) {
      if (error.code === "23001") {
        throw new Error(
          "This service cannot be permanently deleted because it is associated with existing appointments. Archive it instead.",
        );
      }

      throw error;
    }

    if (!deleted) {
      throw new Error("Failed to permanently delete service");
    }

    if (service.image_public_id) {
      await cloudinary.uploader.destroy(service.image_public_id, {
        resource_type: "image",
      });
    }

    return {
      message: "Service permanently deleted",
      service: deleted,
    };
  }
}
