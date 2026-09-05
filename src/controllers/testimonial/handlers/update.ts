import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { UpdateTestimonialService } from "../../../services/testimonial";
import { updateTestimonialValidator } from "../../../validators/testimonial.validator";

const updateTestimonialService = new UpdateTestimonialService();

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const testimonialId = Number(req.params.id);

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Invalid testimonial ID.",
      });
    }

    const validated = updateTestimonialValidator.parse(req.body);
    const userId = req.user.id;

    const testimonial = await updateTestimonialService.updateTestimonial(
      testimonialId,
      userId,
      validated,
    );

    return res.status(200).json({
      message:
        "Testimonial updated successfully. It is now pending admin review.",
      data: testimonial,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
