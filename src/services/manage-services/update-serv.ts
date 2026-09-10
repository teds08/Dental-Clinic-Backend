import {
  UpdateServiceRepository,
  FindServiceRepository,
} from "../../repositories/manage-services/index";
import cloudinary from "../../config/cloudinary";

export class UpdateService {
  private repo = new UpdateServiceRepository();
  private findRepo = new FindServiceRepository();

  async updateService(id: number, data: any) {
    const old = await this.findRepo.findById(id);

    if (!old) {
      throw new Error("Service not found");
    }

    // Only process provided fields
    const updateData: Record<string, any> = {};
    const allowedFields = [
      "title",
      "description",
      "price",
      "image",
      "image_public_id",
      "icon",
      "points",
      "duration_minutes",
      "category",
    ];

    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    // Delete old image if new one provided
    if (updateData.image && old.image_public_id) {
      await cloudinary.uploader.destroy(old.image_public_id);
    }

    // Update DB (only returns changed fields)
    return await this.repo.update(id, updateData);
  }
}
