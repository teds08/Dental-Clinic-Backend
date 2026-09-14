"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerateTestimonialService = void 0;
const testimonial_1 = require("../../repositories/testimonial");
const findTestimonialRepository = new testimonial_1.FindTestimonialRepository();
const moderateTestimonialRepository = new testimonial_1.ModerateTestimonialRepository();
class ModerateTestimonialService {
    async approveTestimonial(testimonialId) {
        const testimonial = await findTestimonialRepository.findById(testimonialId);
        if (!testimonial) {
            throw new Error("Testimonial not found.");
        }
        if (testimonial.status !== "PENDING") {
            throw new Error("Only pending testimonials can be approved.");
        }
        const approvedTestimonial = await moderateTestimonialRepository.approve(testimonialId);
        if (!approvedTestimonial) {
            throw new Error("Testimonial could not be approved.");
        }
        return approvedTestimonial;
    }
    async rejectTestimonial(testimonialId) {
        const testimonial = await findTestimonialRepository.findById(testimonialId);
        if (!testimonial) {
            throw new Error("Testimonial not found.");
        }
        if (testimonial.status !== "PENDING") {
            throw new Error("Only pending testimonials can be rejected.");
        }
        const rejectedTestimonial = await moderateTestimonialRepository.reject(testimonialId);
        if (!rejectedTestimonial) {
            throw new Error("Testimonial could not be rejected.");
        }
        return rejectedTestimonial;
    }
}
exports.ModerateTestimonialService = ModerateTestimonialService;
