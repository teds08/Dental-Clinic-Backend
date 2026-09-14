"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicTestimonial = void 0;
const testimonial_1 = require("../../../services/testimonial");
const findTestimonialService = new testimonial_1.FindTestimonialService();
const getPublicTestimonial = async (req, res) => {
    try {
        const testimonialId = Number(req.params.id);
        if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
            return res.status(400).json({
                message: "Invalid testimonial ID.",
            });
        }
        const testimonial = await findTestimonialService.getPublicTestimonial(testimonialId);
        return res.status(200).json({
            message: "Testimonial fetched successfully.",
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
exports.getPublicTestimonial = getPublicTestimonial;
