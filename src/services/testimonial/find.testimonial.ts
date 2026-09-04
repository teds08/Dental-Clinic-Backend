import { FindTestimonialRepository } from "../../repositories/testimonial";

const findTestimonialRepository = new FindTestimonialRepository();

export class FindTestimonialService {
  async getPublicTestimonial(testimonialId: number) {
    const testimonial =
      await findTestimonialRepository.findApprovedById(testimonialId);

    if (!testimonial) {
      throw new Error("Testimonial not found.");
    }

    return testimonial;
  }

  async getMyTestimonials(userId: number) {
    return await findTestimonialRepository.findMyTestimonials(userId);
  }

  async getApprovedTestimonials() {
    return await findTestimonialRepository.findApprovedTestimonials();
  }

  async getPendingTestimonials() {
    return await findTestimonialRepository.findPendingTestimonials();
  }
}
