"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTestimonialService = void 0;
const testimonial_1 = require("../../repositories/testimonial");
const findTestimonialRepository = new testimonial_1.FindTestimonialRepository();
const deleteTestimonialRepository = new testimonial_1.DeleteTestimonialRepository();
class DeleteTestimonialService {
    async deleteTestimonial(testimonialId, userId) {
        const testimonial = await findTestimonialRepository.findByIdAndUserId(testimonialId, userId);
        if (!testimonial) {
            throw new Error("Testimonial not found or you do not have permission to delete it.");
        }
        const deletedTestimonial = await deleteTestimonialRepository.delete(testimonialId, userId);
        if (!deletedTestimonial) {
            throw new Error("Testimonial could not be deleted.");
        }
        return deletedTestimonial;
    }
}
exports.DeleteTestimonialService = DeleteTestimonialService;
