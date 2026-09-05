import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { ModerateTestimonialService } from "../../../services/testimonial";

const moderateTestimonialService = new ModerateTestimonialService();

export const approve = async (req: AuthRequest, res: Response) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial =
      await moderateTestimonialService.approveTestimonial(testimonialId);

    return res.status(200).json({
      message: "Testimonial approved successfully.",
      data: testimonial,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
