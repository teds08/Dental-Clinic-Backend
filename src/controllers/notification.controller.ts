import {Request, Response} from "express";
import {AuthRequest} from "../middlewares/auth.middleware";
import {FindNotificationsService , UnreadNotificationCountService, MarkNotificationReadService, MarkAllNotificationsReadService} from "../services/notification/index";


const findNotificationsService = new FindNotificationsService();
const unreadNotificationCountService = new UnreadNotificationCountService();
const markNotificationReadService = new MarkNotificationReadService();
const markAllNotificationsReadService = new MarkAllNotificationsReadService();

export class NotificationController {

  async getMyNotifications( req: AuthRequest, res: Response) {

    try {

      const userId = req.user.id;
      const notifications = await findNotificationsService.getNotifications(userId);

      return res.status(200).json({
        message: "Notifications retrieved successfully.",
        data: notifications
      });

    } catch (error: any) {

      return res.status(500).json({
        message: error.message
      });

    }

  }

  async getUnreadCount( req: AuthRequest, res: Response) {

  try {

    const userId = req.user.id;
    const result = await unreadNotificationCountService.getCount(userId);

    return res.status(200).json({
      message: "Unread notification count retrieved successfully.",
      data: result
    });

  } catch (error: any) {

    return res.status(500).json({
      message: error.message
    });

  }

}

  async markAsRead( req: AuthRequest, res: Response) {

  try {

    const notificationId = Number(req.params.id);
    const userId = req.user.id;
    const notification = await markNotificationReadService.mark( notificationId, userId );

    return res.status(200).json({
      message: "Notification marked as read.",
      data: notification
    });

  } catch (error: any) {

    return res.status(404).json({
      message: error.message
    });

  }

}

  async markAllAsRead(req: AuthRequest,res: Response) {

  try {

    const userId = req.user.id;
    const result = await markAllNotificationsReadService.markAll(userId);

    return res.status(200).json({
      message: "All notifications marked as read.",
      data: result
    });

  } catch (error: any) {

    return res.status(500).json({
      message: error.message
    });

  }

}


}