import cloudinary from "../../config/cloudinary";
import { IUpdateService } from "../../interfaces/service.interface";
import { UpdateServiceRepository } from "../../repositories/manage-services";

export class UpdateService {
  private repo = new UpdateServiceRepository();

  async updateService(id: number, data: IUpdateService, imageBuffer?: Buffer) {
    const existingService = await this.repo.findById(id);

    if (!existingService) {
      throw new Error("Service not found.");
    }

    let image = existingService.image;
    let imagePublicId = existingService.image_public_id;

    if (imageBuffer) {
      const uploadResult = await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "services",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Cloudinary upload failed."));
              return;
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          },
        );

        uploadStream.end(imageBuffer);
      });

      image = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const updatedService = await this.repo.update(id, {
      ...data,
      image,
      image_public_id: imagePublicId,
    });

    if (!updatedService) {
      throw new Error("Failed to update service.");
    }

    if (
      imageBuffer &&
      existingService.image_public_id &&
      existingService.image_public_id !== imagePublicId
    ) {
      await cloudinary.uploader.destroy(existingService.image_public_id, {
        resource_type: "image",
      });
    }

    return {
      message: "Service updated successfully.",
      service: updatedService,
    };
  }
}
