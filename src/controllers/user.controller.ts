import { Request, Response } from "express";
import { CreateUserService , UpdateUserService, GetProfileService  } from "../services/user/index";
import { createUserSchema } from "../validators/user.validator";

const createUserService = new CreateUserService();
const updateUserService = new UpdateUserService();
const getProfileService = new GetProfileService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const validated = createUserSchema.parse(req.body);
      const result = await createUserService.createUser(validated);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
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