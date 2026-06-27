import { Request, Response } from "express";
import { FindAllUserAdminService , HardDeleteUserAdminService, SoftDeleteUserAdminService , RestoreUserAdminService , AdminCreateUserService, FindArchiveUsersService} from "../services/admin/index";
import { adminCreateUserValidator } from "../validators/admin.service.validator";

const findAllService = new FindAllUserAdminService();
const hardDeleteService = new HardDeleteUserAdminService();
const softDeleteService = new SoftDeleteUserAdminService();
const restoreUserService = new RestoreUserAdminService();
const adminCreateUserService = new AdminCreateUserService();
const findArchiveUsersService = new FindArchiveUsersService();

export class AdminController {
  
  async getAll(req: Request, res: Response) {
    try {
      const users = await findAllService.getUsers();

      return res.status(200).json({
        message: "Users fetched successfully",
        data: users
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async softDelete(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const user = await softDeleteService.softDeleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User soft deleted successfully",
      data: user
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}
  

   async hardDelete(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const user = await hardDeleteService.hardDeleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User permanently deleted",
      data: user
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

   async restore(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const user = await restoreUserService.restoreUser(id);

    return res.status(200).json({
      message: "User restored successfully",
      data: user
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message
    });
  }
}

   async adminCreate(req: Request, res: Response) {
    try {
      const validated =
        adminCreateUserValidator.parse(req.body);

      const user =
        await adminCreateUserService.adminCreateUser(
          validated
        );

      return res.status(201).json({
        message: "User created successfully",
        data: user
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

   async findArchivedUsers(req: Request, res: Response) {

    try {

      const result =
        await findArchiveUsersService.getArchivedUsers();

      return res.status(200).json(result);

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      });

    }

  }

}