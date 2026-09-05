import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { register } from "./handlers/register";
import { update } from "./handlers/update";
import { profile } from "./handlers/profile";
import { sendOTP } from "./handlers/sendOTP";
import { verifyOTP } from "./handlers/verifyOTP";
import { changePassword } from "./handlers/changePassword";
import { resendOTP } from "./handlers/resendOTP";

export class UserController {
  async register(req: Request, res: Response) {
    return register(req, res);
  }

  async update(req: AuthRequest, res: Response) {
    return update(req, res);
  }

  async profile(req: AuthRequest, res: Response) {
    return profile(req, res);
  }

  async sendOTP(req: AuthRequest, res: Response) {
    return sendOTP(req, res);
  }

  async verifyOTP(req: AuthRequest, res: Response) {
    return verifyOTP(req, res);
  }

  async changePassword(req: AuthRequest, res: Response) {
    return changePassword(req, res);
  }

  async resendOTP(req: AuthRequest, res: Response) {
    return resendOTP(req, res);
  }
}
