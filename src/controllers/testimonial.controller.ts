import { Request, Response } from "express";

import {
  CreateTestimonialService,
  FindTestimonialService,
  UpdateTestimonialService,
  DeleteTestimonialService,
  ModerateTestimonialService,
} from "../services/testimonial";

import {
  createTestimonialValidator,
  updateTestimonialValidator,
} from "../validators/testimonial.validator";

import { AuthRequest } from "../middlewares/auth.middleware";

const createTestimonialService = new CreateTestimonialService();
const findTestimonialService = new FindTestimonialService();
const updateTestimonialService = new UpdateTestimonialService();
const deleteTestimonialService = new DeleteTestimonialService();
const moderateTestimonialService = new ModerateTestimonialService();

export class TestimonialController {
  async create(req: AuthRequest, res: Response) {
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
  }

  async getPublicTestimonials(req: Request, res: Response) {
    try {
      const testimonials =
        await findTestimonialService.getApprovedTestimonials();

      return res.status(200).json({
        message: "Testimonials fetched successfully.",
        data: testimonials,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getPublicTestimonial(req: Request, res: Response) {
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
  }

  async getMyTestimonials(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;

      const testimonials =
        await findTestimonialService.getMyTestimonials(userId);

      return res.status(200).json({
        message: "Your testimonials fetched successfully.",
        data: testimonials,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: AuthRequest, res: Response) {
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
  }

  async delete(req: AuthRequest, res: Response) {
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
  }

  async getPendingTestimonials(req: AuthRequest, res: Response) {
    try {
      const testimonials =
        await findTestimonialService.getPendingTestimonials();

      return res.status(200).json({
        message: "Pending testimonials fetched successfully.",
        data: testimonials,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async approve(req: AuthRequest, res: Response) {
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
  }

  async reject(req: AuthRequest, res: Response) {
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
  }
}
