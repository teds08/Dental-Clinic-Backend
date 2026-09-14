"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePermanentService = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const index_1 = require("../../repositories/manage-services/index");
class DeletePermanentService {
    constructor() {
        this.repo = new index_1.DeletePermanentRepository();
    }
    async deleteService(id) {
        const service = await this.repo.findById(id);
        if (!service) {
            throw new Error("Service not found");
        }
        let deleted;
        try {
            deleted = await this.repo.delete(id);
        }
        catch (error) {
            if (error.code === "23001") {
                throw new Error("This service cannot be permanently deleted because it is associated with existing appointments. Archive it instead.");
            }
            throw error;
        }
        if (!deleted) {
            throw new Error("Failed to permanently delete service");
        }
        if (service.image_public_id) {
            await cloudinary_1.default.uploader.destroy(service.image_public_id, {
                resource_type: "image",
            });
        }
        return {
            message: "Service permanently deleted",
            service: deleted,
        };
    }
}
exports.DeletePermanentService = DeletePermanentService;
