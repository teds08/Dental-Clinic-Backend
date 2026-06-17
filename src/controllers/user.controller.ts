import { Request, Response } from "express";
import { CreateUserService , UpdateUserService, GetProfileService , AuthenticatedPasswordChangeService  } from "../services/user/index";
import { registerValidator } from "../validators/user.validator";

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


  async update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await updateUserService.updateUser(id, req.body);

  res.json(result);
}


  async profile(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;

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



  async sendOTP(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const result =
      await authenticatedPasswordChangeService.sendPasswordChangeOTP(userId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}


  async verifyOTP(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

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


  async changePassword(req: Request,res: Response) {
  try {
    const userId = res.locals.user.id;
     console.log("userId:", userId);               // check this
    console.log("body:", req.body); 
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

  async resendOTP(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.user.id;

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