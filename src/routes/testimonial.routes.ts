import { Router } from "express";

import { TestimonialController } from "../controllers/testimonial.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";

const router = Router();

const testimonialController = new TestimonialController();

// ==========================================
// PUBLIC TESTIMONIAL ROUTES
// ==========================================

// Get all approved testimonials
router.get("/getall/testimonials", testimonialController.getPublicTestimonials);

// ==========================================
// ACCOUNT OWNER ROUTES
// ==========================================

router.get(
  "/my/testimonials",
  authenticate,
  testimonialController.getMyTestimonials,
);

router.post("/create/testimonials", authenticate, testimonialController.create);

router.put(
  "/update/testimonials/:id",
  authenticate,
  testimonialController.update,
);

router.delete(
  "/delete/testimonials/:id",
  authenticate,
  testimonialController.delete,
);

// ==========================================
// ADMIN MODERATION ROUTES
// ==========================================

router.get(
  "/admin/pending/testimonials",
  authenticate,
  adminOnly,
  testimonialController.getPendingTestimonials,
);

router.put(
  "/admin/approve/testimonials/:id",
  authenticate,
  adminOnly,
  testimonialController.approve,
);

// Reject testimonial
router.put(
  "/admin/reject/testimonials/:id",
  authenticate,
  adminOnly,
  testimonialController.reject,
);

// ==========================================
// PUBLIC SINGLE TESTIMONIAL
// ==========================================

// This must come after /my and /admin routes
router.get("/:id", testimonialController.getPublicTestimonial);

export default router;
