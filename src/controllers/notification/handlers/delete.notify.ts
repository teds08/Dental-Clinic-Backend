import { Response } from "express";
import { DeleteNotificationService } from "../../../services/notification";
import { AuthRequest } from "../../../middlewares/auth.middleware";

const service = new DeleteNotificationService();

export async function deleteNotification(req: AuthRequest, res: Response) {
  try {
    const notificationId = Number(req.params.id);
    const userId = req.user.id;

    if (!Number.isInteger(notificationId) || notificationId <= 0) {
      return res.status(400).json({
        message: "Invalid notification ID.",
      });
    }

    const deletedNotification = await service.deleteNotification(
      notificationId,
      userId,
    );

    if (!deletedNotification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    return res.status(500).json({
      message: "Failed to delete notification.",
    });
  }
}
