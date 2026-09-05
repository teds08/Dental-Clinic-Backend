import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { MarkNotificationReadService } from "../../../services/notification/index";

const markNotificationReadService = new MarkNotificationReadService();

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const notificationId = Number(req.params.id);
    const userId = req.user.id;
    const notification = await markNotificationReadService.mark(
      notificationId,
      userId,
    );

    return res.status(200).json({
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
