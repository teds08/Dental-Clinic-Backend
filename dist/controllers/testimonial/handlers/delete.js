"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = void 0;
const testimonial_1 = require("../../../services/testimonial");
const deleteTestimonialService = new testimonial_1.DeleteTestimonialService();
const deleteTestimonial = async (req, res) => {
    try {
        const testimonialId = Number(req.params.id);
        if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
            return res.status(400).json({
                message: "Invalid testimonial ID.",
            });
        }
        const userId = req.user.id;
        await deleteTestimonialService.deleteTestimonial(testimonialId, userId);
        return res.status(200).json({
            message: "Testimonial deleted successfully.",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.deleteTestimonial = deleteTestimonial;
