import { Router } from "express";
import { AppointmentController } from "../controllers/appointment/appointment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";

const router = Router();
const appointmentController = new AppointmentController();

// Admin Routes
router.get("/getall/appointment", authenticate, adminOnly, (req, res) =>
  appointmentController.getAllAppointments(req, res),
);
router.patch("/approve/appointment/:id", authenticate, adminOnly, (req, res) =>
  appointmentController.approveAppointment(req, res),
);
router.patch("/reject/appointment/:id", authenticate, adminOnly, (req, res) =>
  appointmentController.rejectAppointment(req, res),
);
router.patch(
  "/appointments/complete/:id",
  authenticate,
  adminOnly,
  (req, res) => appointmentController.completeAppointment(req, res),
);

// User Routes
router.post("/create/appointment", authenticate, (req, res) =>
  appointmentController.create(req, res),
);
router.get("/my/appointment", authenticate, (req, res) =>
  appointmentController.getMyAppointments(req, res),
);
router.get("/appointment/:id", authenticate, (req, res) =>
  appointmentController.getAppointmentDetails(req, res),
);
router.patch("/cancel/appointment/:id", authenticate, (req, res) =>
  appointmentController.cancelAppointment(req, res),
);

export default router;
