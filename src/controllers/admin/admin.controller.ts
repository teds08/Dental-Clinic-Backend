import { Request, Response } from "express";
import { getAllUsers } from "./handlers/getAllUsers";
import { softDeleteUser } from "./handlers/softDeleteUser";
import { hardDeleteUser } from "./handlers/hardDeleteUser";
import { restoreUser } from "./handlers/restoreUser";
import { createUser } from "./handlers/createUser";
import { getArchivedUsers } from "./handlers/getArchivedUsers";

export class AdminController {
  async getAll(req: Request, res: Response) {
    return getAllUsers(req, res);
  }

  async softDelete(req: Request, res: Response) {
    return softDeleteUser(req, res);
  }

  async hardDelete(req: Request, res: Response) {
    return hardDeleteUser(req, res);
  }

  async restore(req: Request, res: Response) {
    return restoreUser(req, res);
  }

  async adminCreate(req: Request, res: Response) {
    return createUser(req, res);
  }

  async findArchivedUsers(req: Request, res: Response) {
    return getArchivedUsers(req, res);
  }
}
