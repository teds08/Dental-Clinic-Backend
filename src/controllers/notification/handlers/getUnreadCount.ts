import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { UnreadNotificationCountService } from "../../../services/notification/index";

const unreadNotificationCountService = new UnreadNotificationCountService();

export const getUnreadCount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await unreadNotificationCountService.getCount(userId);

    return res.status(200).json({
      message: "Unread notification count retrieved successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
