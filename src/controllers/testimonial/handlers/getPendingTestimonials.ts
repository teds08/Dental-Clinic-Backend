import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { FindTestimonialService } from "../../../services/testimonial";

const findTestimonialService = new FindTestimonialService();

export const getPendingTestimonials = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const testimonials = await findTestimonialService.getPendingTestimonials();

    return res.status(200).json({
      message: "Pending testimonials fetched successfully.",
      data: testimonials,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
