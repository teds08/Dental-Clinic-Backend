"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const testimonial_1 = require("../../../services/testimonial");
const testimonial_validator_1 = require("../../../validators/testimonial.validator");
const createTestimonialService = new testimonial_1.CreateTestimonialService();
const create = async (req, res) => {
    try {
        const validated = testimonial_validator_1.createTestimonialValidator.parse(req.body);
        const userId = req.user.id;
        const testimonial = await createTestimonialService.createTestimonial(userId, validated);
        return res.status(201).json({
            message: "Testimonial submitted successfully. It is now pending admin review.",
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.create = create;
