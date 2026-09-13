import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { NotificationController } from "../controllers/notification/notification.controller";

const router = Router();

const notif = new NotificationController();

router.get("/unread-count", authenticate, (req, res) =>
  notif.getUnreadCount(req, res),
);
router.get("/get-notif", authenticate, (req, res) =>
  notif.getMyNotifications(req, res),
);
router.patch("/read/:id", authenticate, (req, res) =>
  notif.markAsRead(req, res),
);
router.patch("/read-all", authenticate, (req, res) =>
  notif.markAllAsRead(req, res),
);

router.delete("/delete/notify/:id", authenticate, (req, res) =>
  notif.deleteNotification(req, res),
);

export default router;
