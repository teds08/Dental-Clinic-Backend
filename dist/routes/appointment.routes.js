"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment/appointment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
const appointmentController = new appointment_controller_1.AppointmentController();
// Admin Routes
router.get("/getall/appointment", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => appointmentController.getAllAppointments(req, res));
router.patch("/approve/appointment/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => appointmentController.approveAppointment(req, res));
router.patch("/reject/appointment/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => appointmentController.rejectAppointment(req, res));
router.patch("/appointments/complete/:id", auth_middleware_1.authenticate, admin_middleware_1.adminOnly, (req, res) => appointmentController.completeAppointment(req, res));
// User Routes
router.post("/create/appointment", auth_middleware_1.authenticate, (req, res) => appointmentController.create(req, res));
router.get("/my/appointment", auth_middleware_1.authenticate, (req, res) => appointmentController.getMyAppointments(req, res));
router.get("/appointment/:id", auth_middleware_1.authenticate, (req, res) => appointmentController.getAppointmentDetails(req, res));
router.patch("/cancel/appointment/:id", auth_middleware_1.authenticate, (req, res) => appointmentController.cancelAppointment(req, res));
exports.default = router;
