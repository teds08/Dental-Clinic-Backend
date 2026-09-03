import { FindAdminsRepository } from "../../../repositories/admin/index";

export const findAllAdmins = async () => {
  const adminRepo = new FindAdminsRepository();
  return await adminRepo.findAll();
};