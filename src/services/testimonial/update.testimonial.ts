import {
  FindTestimonialRepository,
  UpdateTestimonialRepository,
} from "../../repositories/testimonial";

import { IUpdateTestimonial } from "../../interfaces/testimonial.interface";

const findTestimonialRepository = new FindTestimonialRepository();

const updateTestimonialRepository = new UpdateTestimonialRepository();

export class UpdateTestimonialService {
  async updateTestimonial(
    testimonialId: number,
    userId: number,
    data: IUpdateTestimonial,
  ) {
    const testimonial = await findTestimonialRepository.findByIdAndUserId(
      testimonialId,
      userId,
    );

    if (!testimonial) {
      throw new Error(
        "Testimonial not found or you do not have permission to update it.",
      );
    }

    const updatedTestimonial = await updateTestimonialRepository.update(
      testimonialId,
      userId,
      data,
    );

    if (!updatedTestimonial) {
      throw new Error("Testimonial could not be updated.");
    }

    return updatedTestimonial;
  }
}
