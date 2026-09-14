"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicTestimonials = void 0;
const testimonial_1 = require("../../../services/testimonial");
const findTestimonialService = new testimonial_1.FindTestimonialService();
const getPublicTestimonials = async (req, res) => {
    try {
        const testimonials = await findTestimonialService.getApprovedTestimonials();
        return res.status(200).json({
            message: "Testimonials fetched successfully.",
            data: testimonials,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getPublicTestimonials = getPublicTestimonials;
