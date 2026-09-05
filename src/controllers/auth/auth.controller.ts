import { Request, Response } from "express";
import { login } from "./handlers/login";
import { requestOtp } from "./handlers/requestOtp";
import { verifyOtp } from "./handlers/verifyOtp";
import { resetPassword } from "./handlers/resetPassword";
import { resendOtp } from "./handlers/resendOtp";

export class AuthController {
  async login(req: Request, res: Response) {
    return login(req, res);
  }

  async requestOtp(req: Request, res: Response) {
    return requestOtp(req, res);
  }

  async verifyOtp(req: Request, res: Response) {
    return verifyOtp(req, res);
  }

  async resetPassword(req: Request, res: Response) {
    return resetPassword(req, res);
  }

  async resendOtp(req: Request, res: Response) {
    return resendOtp(req, res);
  }
}
