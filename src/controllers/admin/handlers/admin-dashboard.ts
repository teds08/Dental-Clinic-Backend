import { Request, Response } from "express";
import { AdminDashboardService } from "../../../services/admin/index";

const adminDashboardService = new AdminDashboardService();

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await adminDashboardService.getDashboard();

    return res.status(200).json({
      success: true,
      message: "Admin dashboard retrieved successfully.",
      data: dashboard,
    });
  } catch (error) {
    console.error("Get admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve admin dashboard.",
    });
  }
};
