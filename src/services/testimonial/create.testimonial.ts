import { CreateTestimonialRepository } from "../../repositories/testimonial";
import { ICreateTestimonial } from "../../interfaces/testimonial.interface";

const createTestimonialRepository = new CreateTestimonialRepository();

export class CreateTestimonialService {
  async createTestimonial(userId: number, data: ICreateTestimonial) {
    const testimonial = await createTestimonialRepository.create(userId, data);

    return testimonial;
  }
}
