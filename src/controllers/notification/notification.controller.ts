import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { getMyNotifications } from "./handlers/getMyNotifications";
import { getUnreadCount } from "./handlers/getUnreadCount";
import { markAsRead } from "./handlers/markAsRead";
import { markAllAsRead } from "./handlers/markAllAsRead";

export class NotificationController {
  async getMyNotifications(req: AuthRequest, res: Response) {
    return getMyNotifications(req, res);
  }

  async getUnreadCount(req: AuthRequest, res: Response) {
    return getUnreadCount(req, res);
  }

  async markAsRead(req: AuthRequest, res: Response) {
    return markAsRead(req, res);
  }

  async markAllAsRead(req: AuthRequest, res: Response) {
    return markAllAsRead(req, res);
  }
}
