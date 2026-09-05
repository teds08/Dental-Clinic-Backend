import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { CreateTestimonialService } from "../../../services/testimonial";
import { createTestimonialValidator } from "../../../validators/testimonial.validator";

const createTestimonialService = new CreateTestimonialService();

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const validated = createTestimonialValidator.parse(req.body);
    const userId = req.user.id;

    const testimonial = await createTestimonialService.createTestimonial(
      userId,
      validated,
    );

    return res.status(201).json({
      message:
        "Testimonial submitted successfully. It is now pending admin review.",
      data: testimonial,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
