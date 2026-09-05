import { Request, Response } from "express";
import { create } from "./handlers/create";
import { update } from "./handlers/update";
import { archive } from "./handlers/archive";
import { restore } from "./handlers/restore";
import { archiveList } from "./handlers/archiveList";
import { getAll } from "./handlers/getAll";
import { hardDelete } from "./handlers/hardDelete";

export class ServiceController {
  async create(req: Request, res: Response) {
    return create(req, res);
  }

  async update(req: Request, res: Response) {
    return update(req, res);
  }

  async archive(req: Request, res: Response) {
    return archive(req, res);
  }

  async restore(req: Request, res: Response) {
    return restore(req, res);
  }

  async archiveList(req: Request, res: Response) {
    return archiveList(req, res);
  }

  async getAll(req: Request, res: Response) {
    return getAll(req, res);
  }

  async hardDelete(req: Request, res: Response) {
    return hardDelete(req, res);
  }
}
