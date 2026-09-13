import { ICreateService, IService } from "../../interfaces/service.interface";
import { CreateServiceRepository } from "../../repositories/manage-services/index";
import cloudinary from "../../config/cloudinary";

export class CreateService {
  private repo = new CreateServiceRepository();

  async createService(data: ICreateService, imageBuffer: Buffer) {
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

    const serviceData: IService = {
      ...data,
      image: uploadResult.secure_url,
      image_public_id: uploadResult.public_id,
    };

    const result = await this.repo.create(serviceData);

    return {
      message: "Service created successfully",
      service: result,
    };
  }
}
