import { Request, Response } from "express";
import { FindTestimonialService } from "../../../services/testimonial";

const findTestimonialService = new FindTestimonialService();

export const getPublicTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await findTestimonialService.getApprovedTestimonials();

    return res.status(200).json({
      message: "Testimonials fetched successfully.",
      data: testimonials,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
