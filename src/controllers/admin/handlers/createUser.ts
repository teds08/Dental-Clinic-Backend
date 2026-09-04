import { Request, Response } from "express";
import { AdminCreateUserService } from "../../../services/admin/index";
import { adminCreateUserValidator } from "../../../validators/admin.service.validator";

const adminCreateUserService = new AdminCreateUserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const validated = adminCreateUserValidator.parse(req.body);

    const user = await adminCreateUserService.adminCreateUser(validated);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
