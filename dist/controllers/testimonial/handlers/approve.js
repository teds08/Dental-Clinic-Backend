"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approve = void 0;
const testimonial_1 = require("../../../services/testimonial");
const moderateTestimonialService = new testimonial_1.ModerateTestimonialService();
const approve = async (req, res) => {
    try {
        const testimonialId = Number(req.params.id);
        if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
            return res.status(400).json({
                message: "Invalid testimonial ID.",
            });
        }
        const testimonial = await moderateTestimonialService.approveTestimonial(testimonialId);
        return res.status(200).json({
            message: "Testimonial approved successfully.",
            data: testimonial,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.approve = approve;
