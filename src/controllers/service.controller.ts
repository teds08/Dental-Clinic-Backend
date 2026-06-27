import { Request, Response } from "express";
import { CreateService, UpdateService, SoftDeleteService, RestoreService, ArchiveListService, GetAllServiceService, DeletePermanentService} from "../services/manageservice/index";
import {CreateServiceValidator, UpdateServiceValidator} from "../validators/admin.service.validator";

export class ServiceController {
  private Create = new CreateService();
  private Update = new UpdateService();
  private SoftDel = new SoftDeleteService();
  private RestoringService = new RestoreService();
  private ShowArchiveList = new ArchiveListService();
  private GetActiveService = new GetAllServiceService();
  private DeletePermanent = new DeletePermanentService();


  async create(req: Request, res: Response) {

    try {

      const validatedData = CreateServiceValidator.parse({
        ...req.body,
        price: Number(req.body.price) 
      });

      const result =
        await this.Create.createService(validatedData);

      return res.status(201).json(result);

    } catch (error: any) {

      return res.status(400).json({
        message: error.errors || error.message
      });

    }

}


  async update(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      const data = UpdateServiceValidator.parse(req.body);

      const result =
        await this.Update.updateService(id, data);

      return res.status(200).json(result);

    } catch (error: any) {

      return res.status(400).json({
        message: error.errors || error.message
      });

    }
}


  async archive(req: Request, res: Response) {

  try {

    const id = Number(req.params.id);

    const result =
      await this.SoftDel.deleteService(id);


    return res.status(200).json(result);


  } catch(error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}


  async restore(req: Request, res: Response) {

  try {

    const id = Number(req.params.id);

    const result =
      await this.RestoringService.restoreService(id);

    return res.status(200).json(result);

  } catch (error: any) {

    return res.status(400).json({
      message: error.message
    });

  }
}


  async archiveList(req: Request, res: Response) {

  try {

    const result =
      await this.ShowArchiveList.getArchivedServices();


    return res.status(200).json(result);


  } catch(error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}


  async getAll(req: Request, res: Response) {

  try {

    const result =
      await this.GetActiveService.getAllServices();


    return res.status(200).json(result);


  } catch(error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}


  async hardDelete(req: Request, res: Response) {


  try {


    const id =
      Number(req.params.id);



    const result =
      await this.DeletePermanent.deleteService(id);



    return res.status(200).json(result);



  } catch(error:any) {


    return res.status(400).json({
      message: error.message
    });

  }

}

}