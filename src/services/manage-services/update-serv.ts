import {UpdateServiceRepository,FindServiceRepository} from "../../repositories/manage-services/index";
import cloudinary from "../../config/cloudinary";

export class UpdateService {

  private repo = new UpdateServiceRepository();
  private findRepo = new FindServiceRepository();

  async updateService(id: number, data: any) {

    const old = await this.findRepo.findById(id);

    if (!old) {
      throw new Error("Service not found");
    }

    
    if (data.image && old.image_public_id) {

      await cloudinary.uploader.destroy(old.image_public_id);
    }

    // Update DB
    return await this.repo.update(id, data);
  }
}