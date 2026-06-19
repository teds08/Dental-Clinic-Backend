import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import guestRoutes from "./routes/guest.routes";
import serviceRoutes from "./routes/service.routes";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", guestRoutes);
app.use("/api", serviceRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;