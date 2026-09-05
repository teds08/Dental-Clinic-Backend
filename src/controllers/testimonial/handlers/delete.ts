import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { DeleteTestimonialService } from "../../../services/testimonial";

const deleteTestimonialService = new DeleteTestimonialService();

export const deleteTestimonial = async (req: AuthRequest, res: Response) => {
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
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
