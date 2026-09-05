import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { MarkAllNotificationsReadService } from "../../../services/notification/index";

const markAllNotificationsReadService = new MarkAllNotificationsReadService();

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await markAllNotificationsReadService.markAll(userId);

    return res.status(200).json({
      message: "All notifications marked as read.",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
