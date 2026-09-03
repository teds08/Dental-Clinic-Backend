import { FindServiceRepository } from "../../../repositories/manage-services/index";

export const validateService = async (serviceId: number) => {
  const serviceRepo = new FindServiceRepository();
  const service = await serviceRepo.findById(serviceId);

  if (!service) {
    throw new Error("Selected service does not exist.");
  }

  return service;
};