"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTestimonials = void 0;
const testimonial_1 = require("../../../services/testimonial");
const findTestimonialService = new testimonial_1.FindTestimonialService();
const getMyTestimonials = async (req, res) => {
    try {
        const userId = req.user.id;
        const testimonials = await findTestimonialService.getMyTestimonials(userId);
        return res.status(200).json({
            message: "Your testimonials fetched successfully.",
            data: testimonials,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.getMyTestimonials = getMyTestimonials;
