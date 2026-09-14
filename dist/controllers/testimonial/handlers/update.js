"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const testimonial_1 = require("../../../services/testimonial");
const testimonial_validator_1 = require("../../../validators/testimonial.validator");
const updateTestimonialService = new testimonial_1.UpdateTestimonialService();
const update = async (req, res) => {
    try {
        const testimonialId = Number(req.params.id);
        if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
            return res.status(400).json({
                message: "Invalid testimonial ID.",
            });
        }
        const validated = testimonial_validator_1.updateTestimonialValidator.parse(req.body);
        const userId = req.user.id;
        const testimonial = await updateTestimonialService.updateTestimonial(testimonialId, userId, validated);
        return res.status(200).json({
            message: "Testimonial updated successfully. It is now pending admin review.",
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.update = update;
