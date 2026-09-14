"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestimonialService = void 0;
const testimonial_1 = require("../../repositories/testimonial");
const createTestimonialRepository = new testimonial_1.CreateTestimonialRepository();
class CreateTestimonialService {
    async createTestimonial(userId, data) {
        const testimonial = await createTestimonialRepository.create(userId, data);
        return testimonial;
    }
}
exports.CreateTestimonialService = CreateTestimonialService;
