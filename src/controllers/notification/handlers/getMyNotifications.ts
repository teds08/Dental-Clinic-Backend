import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { FindNotificationsService } from "../../../services/notification/index";

const findNotificationsService = new FindNotificationsService();

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const notifications =
      await findNotificationsService.getNotifications(userId);

    return res.status(200).json({
      message: "Notifications retrieved successfully.",
      data: notifications,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
