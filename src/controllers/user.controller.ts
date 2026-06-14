import { Request, Response } from "express";
import { CreateUserService , UpdateUserService, GetProfileService  } from "../services/user/index";
import { registerValidator } from "../validators/user.validator";

const createUserService = new CreateUserService();
const updateUserService = new UpdateUserService();
const getProfileService = new GetProfileService();

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


}