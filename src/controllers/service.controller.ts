import { Request, Response } from "express";
import { CreateServiceService} from "../services/manageService/create_service"
import {ServiceValidator} from "../validators/service.validator"


export class ServiceController {
  private service = new CreateServiceService();

  async create(req: Request, res: Response) {
    try {
      const validatedData = ServiceValidator.parse(req.body);

      const result = await this.service.createService(
        validatedData,
        req.file!
      );

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || error.errors
      });
    }
  }

  
}