import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { create } from "./handlers/create";
import { getPublicTestimonials } from "./handlers/getPublicTestimonials";
import { getPublicTestimonial } from "./handlers/getPublicTestimonial";
import { getMyTestimonials } from "./handlers/getMyTestimonials";
import { update } from "./handlers/update";
import { deleteTestimonial } from "./handlers/delete";
import { getPendingTestimonials } from "./handlers/getPendingTestimonials";
import { approve } from "./handlers/approve";
import { reject } from "./handlers/reject";

export class TestimonialController {
  async create(req: AuthRequest, res: Response) {
    return create(req, res);
  }

  async getPublicTestimonials(req: Request, res: Response) {
    return getPublicTestimonials(req, res);
  }

  async getPublicTestimonial(req: Request, res: Response) {
    return getPublicTestimonial(req, res);
  }

  async getMyTestimonials(req: AuthRequest, res: Response) {
    return getMyTestimonials(req, res);
  }

  async update(req: AuthRequest, res: Response) {
    return update(req, res);
  }

  async delete(req: AuthRequest, res: Response) {
    return deleteTestimonial(req, res);
  }

  async getPendingTestimonials(req: AuthRequest, res: Response) {
    return getPendingTestimonials(req, res);
  }

  async approve(req: AuthRequest, res: Response) {
    return approve(req, res);
  }

  async reject(req: AuthRequest, res: Response) {
    return reject(req, res);
  }
}
