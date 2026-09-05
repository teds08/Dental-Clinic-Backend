import { Request, Response } from "express";
import { FindTestimonialService } from "../../../services/testimonial";

const findTestimonialService = new FindTestimonialService();

export const getPublicTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial =
      await findTestimonialService.getPublicTestimonial(testimonialId);

    return res.status(200).json({
      message: "Testimonial fetched successfully.",
      data: testimonial,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
