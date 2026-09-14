import cloudinary from "../../config/cloudinary";
import { DeletePermanentRepository } from "../../repositories/manage-services/index";

export class DeletePermanentService {
  private repo = new DeletePermanentRepository();

  async deleteService(id: number) {
    const service = await this.repo.findById(id);

    console.log("Service found for deletion:", service);

    if (!service) {
      throw new Error("Service not found");
    }

    if (service.image_public_id) {
      const cloudinaryResult = await cloudinary.uploader.destroy(
        service.image_public_id,
        {
          resource_type: "image",
        },
      );

      console.log("Cloudinary delete result:", cloudinaryResult);
    }

    const deleted = await this.repo.delete(id);

    console.log("Database delete result:", deleted);

    if (!deleted) {
      throw new Error("Failed to permanently delete service");
    }

    return {
      message: "Service permanently deleted",
      service: deleted,
    };
  }
}
