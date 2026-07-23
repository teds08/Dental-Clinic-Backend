import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {NotificationController} from "../controllers/notification.controller";

const router = Router();

const notif = new NotificationController();


router.get("/unread-count", authenticate, (req, res) => notif.getUnreadCount(req, res));
router.get("/get-notif", authenticate, (req, res) => notif.getMyNotifications(req, res));
router.patch("/read/:id", authenticate, (req, res) => notif.markAsRead(req, res));
router.patch("/read-all", authenticate, (req, res) => notif.markAllAsRead(req, res));




// router.get("/unread-count",authenticate,notif.getUnreadCount.bind(notif));
// router.get("/get-notif",authenticate,notif.getMyNotifications.bind(notif));
// router.patch("/read/:id",authenticate,notif.markAsRead.bind(notif));
// router.patch("/read-all",authenticate,notif.markAllAsRead.bind(notif));

export default router;