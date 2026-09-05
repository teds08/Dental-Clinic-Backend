import { Request, Response } from "express";
import { CreateUserService } from "../../../services/user/index";
import { registerValidator } from "../../../validators/user.validator";

const createUserService = new CreateUserService();

export const register = async (req: Request, res: Response) => {
  try {
    const validated = registerValidator.parse(req.body);

    const user = await createUserService.register({
      ...validated,
      password: validated.password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
