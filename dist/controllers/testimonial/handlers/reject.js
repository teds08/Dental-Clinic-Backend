"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = void 0;
const testimonial_1 = require("../../../services/testimonial");
const moderateTestimonialService = new testimonial_1.ModerateTestimonialService();
const reject = async (req, res) => {
    try {
        const testimonialId = Number(req.params.id);
        if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
            return res.status(400).json({
                message: "Invalid testimonial ID.",
            });
        }
        const testimonial = await moderateTestimonialService.rejectTestimonial(testimonialId);
        return res.status(200).json({
            message: "Testimonial rejected successfully.",
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.reject = reject;
