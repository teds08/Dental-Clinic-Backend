import { Request, Response } from "express";
import { LoginAuthService } from "../../../services/auth/index";
import { loginValidator } from "../../../validators/auth.validator";

const loginAuthService = new LoginAuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginValidator.parse(req.body);

    const result = await loginAuthService.login(
      validated.email,
      validated.password,
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
