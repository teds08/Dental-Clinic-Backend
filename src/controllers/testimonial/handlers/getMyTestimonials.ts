import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { FindTestimonialService } from "../../../services/testimonial";

const findTestimonialService = new FindTestimonialService();

export const getMyTestimonials = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const testimonials = await findTestimonialService.getMyTestimonials(userId);

    return res.status(200).json({
      message: "Your testimonials fetched successfully.",
      data: testimonials,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
