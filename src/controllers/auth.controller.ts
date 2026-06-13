import { Request, Response } from "express";
import { AuthService } from "../services/auth/auth.service";
import { loginSchema } from "../validators/auth.validator";

const authService = new AuthService();

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const validated = loginSchema.parse(req.body);

      const result = await authService.login(
        validated.email,
        validated.password
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({
        message: error.message
      });
    }
  }

  
}