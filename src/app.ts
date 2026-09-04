import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes";
import serviceRoutes from "./routes/service.routes";
import pointsRoutes from "./routes/points.routes";
import appointmentRoutes from "./routes/appointment.routes";
import notifRoutes from "./routes/notification.routes";
import testimonialRoutes from "./routes/testimonial.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", publicRoutes);
app.use("/api", serviceRoutes);
app.use("/api", pointsRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", notifRoutes);
app.use("/api", testimonialRoutes);

export default app;
