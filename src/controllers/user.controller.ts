import { Request, Response } from "express";
import { CreateUserService , UpdateUserService, GetProfileService , AuthenticatedPasswordChangeService  } from "../services/user/index";
import { registerValidator, updateProfileValidator } from "../validators/user.validator";
import { AuthRequest } from "../middlewares/auth.middleware";


const createUserService = new CreateUserService();
const updateUserService = new UpdateUserService();
const getProfileService = new GetProfileService();
const authenticatedPasswordChangeService = new AuthenticatedPasswordChangeService();

export class UserController {
  
  async register(req: Request, res: Response) {
    try {
      const validated =
        registerValidator.parse(req.body);

      const user =
        await createUserService.register({
          ...validated,
          password: validated.password
        });

      return res.status(201).json({
        message: "User registered successfully",
        data: user
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  }


  async update(req: AuthRequest, res: Response) {

  try {

    const userId = req.user.id;
    const validated = updateProfileValidator.parse(req.body);
    const updatedUser = await updateUserService.updateUser(userId,validated);

    return res.status(200).json({

      message: "Profile updated successfully.",
      data: updatedUser

    });

  } catch (error: any) {

    return res.status(400).json({

      message: error.message

    });

  }

}


  async profile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;

      const profile = await getProfileService.getProfile(userId);

      return res.status(200).json({
        message: "Profile fetched successfully",
        data: profile
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  }



  async sendOTP(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;

    const result =
      await authenticatedPasswordChangeService.sendPasswordChangeOTP(userId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}


  async verifyOTP(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;

    const result =
      await authenticatedPasswordChangeService.verifyPasswordChangeOTP(
        userId,
        req.body.otp
      );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}


  async changePassword(req: AuthRequest ,res: Response) {
  try {
    const userId = req.user.id;
    const result =
      

      await authenticatedPasswordChangeService.changePassword(
        userId,
        req.body.currentPassword,
        req.body.newPassword,
        req.body.confirmPassword
      );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}


  async resendOTP(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;

    const result =
      await authenticatedPasswordChangeService.resendOTP(
        userId
      );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}


}