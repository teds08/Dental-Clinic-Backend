import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { ModerateTestimonialService } from "../../../services/testimonial";

const moderateTestimonialService = new ModerateTestimonialService();

export const reject = async (req: AuthRequest, res: Response) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial =
      await moderateTestimonialService.rejectTestimonial(testimonialId);

    return res.status(200).json({
      message: "Testimonial rejected successfully.",
      data: testimonial,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
