import {
  FindTestimonialRepository,
  DeleteTestimonialRepository,
} from "../../repositories/testimonial";

const findTestimonialRepository = new FindTestimonialRepository();

const deleteTestimonialRepository = new DeleteTestimonialRepository();

export class DeleteTestimonialService {
  async deleteTestimonial(testimonialId: number, userId: number) {
    const testimonial = await findTestimonialRepository.findByIdAndUserId(
      testimonialId,
      userId,
    );

    if (!testimonial) {
      throw new Error(
        "Testimonial not found or you do not have permission to delete it.",
      );
    }

    const deletedTestimonial = await deleteTestimonialRepository.delete(
      testimonialId,
      userId,
    );

    if (!deletedTestimonial) {
      throw new Error("Testimonial could not be deleted.");
    }

    return deletedTestimonial;
  }
}
