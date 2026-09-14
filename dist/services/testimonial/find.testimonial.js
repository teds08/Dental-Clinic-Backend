"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTestimonialService = void 0;
const testimonial_1 = require("../../repositories/testimonial");
const findTestimonialRepository = new testimonial_1.FindTestimonialRepository();
class FindTestimonialService {
    async getPublicTestimonial(testimonialId) {
        const testimonial = await findTestimonialRepository.findApprovedById(testimonialId);
        if (!testimonial) {
            throw new Error("Testimonial not found.");
        }
        return testimonial;
    }
    async getMyTestimonials(userId) {
        return await findTestimonialRepository.findMyTestimonials(userId);
    }
    async getApprovedTestimonials() {
        return await findTestimonialRepository.findApprovedTestimonials();
    }
    async getPendingTestimonials() {
        return await findTestimonialRepository.findPendingTestimonials();
    }
}
exports.FindTestimonialService = FindTestimonialService;
