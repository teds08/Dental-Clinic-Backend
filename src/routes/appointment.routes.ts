import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {adminOnly} from "../middlewares/admin.middleware";

const router = Router();

const appointmentController = new AppointmentController();

// Admin Routes
router.get("/getall/appointment",authenticate,adminOnly,appointmentController.getAllAppointments.bind(appointmentController));
router.patch("/approve/appointment/:id",authenticate,adminOnly,appointmentController.approveAppointment.bind(appointmentController));
router.patch("/reject/appointment/:id",authenticate,adminOnly,appointmentController.rejectAppointment.bind(appointmentController));

// User Routes
router.post("/create/appointment",authenticate,appointmentController.create.bind(appointmentController));
router.get("/my-appointment",authenticate,appointmentController.getMyAppointments.bind(appointmentController));
router.get("/appointment/:id",authenticate,appointmentController.getAppointmentDetails.bind(appointmentController));
router.patch("/cancel/appointment/:id",authenticate,appointmentController.cancelAppointment.bind(appointmentController));



export default router;