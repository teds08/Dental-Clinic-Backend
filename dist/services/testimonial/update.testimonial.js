"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestimonialService = void 0;
const testimonial_1 = require("../../repositories/testimonial");
const findTestimonialRepository = new testimonial_1.FindTestimonialRepository();
const updateTestimonialRepository = new testimonial_1.UpdateTestimonialRepository();
class UpdateTestimonialService {
    async updateTestimonial(testimonialId, userId, data) {
        const testimonial = await findTestimonialRepository.findByIdAndUserId(testimonialId, userId);
        if (!testimonial) {
            throw new Error("Testimonial not found or you do not have permission to update it.");
        }
        const updatedTestimonial = await updateTestimonialRepository.update(testimonialId, userId, data);
        if (!updatedTestimonial) {
            throw new Error("Testimonial could not be updated.");
        }
        return updatedTestimonial;
    }
}
exports.UpdateTestimonialService = UpdateTestimonialService;
