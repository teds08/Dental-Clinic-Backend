import { FindAdminsRepository } from "../../../repositories/admin/index";

export const findAllAdmins = async (client: any) => {
  const adminRepo = new FindAdminsRepository(client);
  return await adminRepo.findAll();
};