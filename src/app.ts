import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes"
import serviceRoutes from "./routes/service.routes";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", publicRoutes);
app.use("/api", serviceRoutes);

export default app;