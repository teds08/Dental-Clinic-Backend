"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const points_routes_1 = __importDefault(require("./routes/points.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const testimonial_routes_1 = __importDefault(require("./routes/testimonial.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", user_routes_1.default);
app.use("/api", admin_routes_1.default);
app.use("/api", public_routes_1.default);
app.use("/api", service_routes_1.default);
app.use("/api", points_routes_1.default);
app.use("/api", appointment_routes_1.default);
app.use("/api", notification_routes_1.default);
app.use("/api", testimonial_routes_1.default);
exports.default = app;
