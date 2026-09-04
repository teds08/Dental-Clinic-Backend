import {
  FindTestimonialRepository,
  ModerateTestimonialRepository,
} from "../../repositories/testimonial";

const findTestimonialRepository = new FindTestimonialRepository();

const moderateTestimonialRepository = new ModerateTestimonialRepository();

export class ModerateTestimonialService {
  async approveTestimonial(testimonialId: number) {
    const testimonial = await findTestimonialRepository.findById(testimonialId);

    if (!testimonial) {
      throw new Error("Testimonial not found.");
    }

    if (testimonial.status !== "PENDING") {
      throw new Error("Only pending testimonials can be approved.");
    }

    const approvedTestimonial =
      await moderateTestimonialRepository.approve(testimonialId);

    if (!approvedTestimonial) {
      throw new Error("Testimonial could not be approved.");
    }

    return approvedTestimonial;
  }

  async rejectTestimonial(testimonialId: number) {
    const testimonial = await findTestimonialRepository.findById(testimonialId);

    if (!testimonial) {
      throw new Error("Testimonial not found.");
    }

    if (testimonial.status !== "PENDING") {
      throw new Error("Only pending testimonials can be rejected.");
    }

    const rejectedTestimonial =
      await moderateTestimonialRepository.reject(testimonialId);

    if (!rejectedTestimonial) {
      throw new Error("Testimonial could not be rejected.");
    }

    return rejectedTestimonial;
  }
}
