"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonial_controller_1 = require("../controllers/testimonial/testimonial.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
const testimonialController = new testimonial_controller_1.TestimonialController();
// ==========================================
// PUBLIC TESTIMONIAL ROUTES
// ==========================================
// Get all approved testimonials
router.get("/getall/testimonials", testimonialController.getPublicTestimonials);
// ==========================================
// ACCOUNT OWNER ROUTES
// ==========================================
router.get("/my/testimonials", auth_middleware_1.authenticate, testimonialController.getMyTestimonials);
router.post("/create/testimonials", auth_middleware_1.authenticate, testimonialController.create);
router.put("/update/testimonials/:id", auth_middleware_1.authenticate, testimonialController.update);
router.delete("/delete/testimonials/:id", auth_middleware_1.authenticate, testimonialController.delete);
// ==========================================
// ADMIN MODERATION ROUTES
// ==========================================
router.get("/admin/pending/testimonials", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, testimonialController.getPendingTestimonials);
router.put("/admin/approve/testimonials/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, testimonialController.approve);
// Reject testimonial
router.put("/admin/reject/testimonials/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, testimonialController.reject);
// ==========================================
// PUBLIC SINGLE TESTIMONIAL
// ==========================================
// This must come after /my and /admin routes
router.get("/:id", testimonialController.getPublicTestimonial);
exports.default = router;
