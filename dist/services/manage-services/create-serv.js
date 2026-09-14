"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateService = void 0;
const index_1 = require("../../repositories/manage-services/index");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
class CreateService {
    constructor() {
        this.repo = new index_1.CreateServiceRepository();
    }
    async createService(data, imageBuffer) {
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
        const serviceData = {
            ...data,
            image: uploadResult.secure_url,
            image_public_id: uploadResult.public_id,
        };
        const result = await this.repo.create(serviceData);
        return {
            message: "Service created successfully",
            service: result,
        };
    }
}
exports.CreateService = CreateService;
