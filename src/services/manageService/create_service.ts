import { CreateServiceRepository } from "../../repositories/admin/index";

export class CreateServiceService {
  private repository = new CreateServiceRepository();

  async createService(
    data: {
      title: string;
      description: string;
      price: number;
    },
    file: Express.Multer.File
  ) {
    if (!file) {
      throw new Error("Image is required");
    }

    const imagePath = `/uploads/services/${file.filename}`;

    return await this.repository.create({
      image: imagePath,
      title: data.title,
      description: data.description,
      price: data.price
    });
  }
}