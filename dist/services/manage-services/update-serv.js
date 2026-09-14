"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateService = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const manage_services_1 = require("../../repositories/manage-services");
class UpdateService {
    constructor() {
        this.repo = new manage_services_1.UpdateServiceRepository();
    }
    async updateService(id, data, imageBuffer) {
        const existingService = await this.repo.findById(id);
        if (!existingService) {
            throw new Error("Service not found.");
        }
        let image = existingService.image;
        let imagePublicId = existingService.image_public_id;
        if (imageBuffer) {
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.default.uploader.upload_stream({
                    folder: "services",
                    resource_type: "image",
                }, (error, result) => {
                    if (error || !result) {
                        reject(error || new Error("Cloudinary upload failed."));
                        return;
                    }
                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                    });
                });
                uploadStream.end(imageBuffer);
            });
            image = uploadResult.secure_url;
            imagePublicId = uploadResult.public_id;
        }
        const updatedService = await this.repo.update(id, {
            ...data,
            image,
            image_public_id: imagePublicId,
        });
        if (!updatedService) {
            throw new Error("Failed to update service.");
        }
        if (imageBuffer &&
            existingService.image_public_id &&
            existingService.image_public_id !== imagePublicId) {
            await cloudinary_1.default.uploader.destroy(existingService.image_public_id, {
                resource_type: "image",
            });
        }
        return {
            message: "Service updated successfully.",
            service: updatedService,
        };
    }
}
exports.UpdateService = UpdateService;
