import { Request, Response } from "express";
import { FindAllUserAdminService , HardDeleteUserAdminService, SoftDeleteUserAdminService} from "../services/admin/index";

const findAllService = new FindAllUserAdminService();
const hardDeleteService = new HardDeleteUserAdminService();
const softDeleteService = new SoftDeleteUserAdminService();

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

}