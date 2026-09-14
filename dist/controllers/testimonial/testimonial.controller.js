"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialController = void 0;
const create_1 = require("./handlers/create");
const getPublicTestimonials_1 = require("./handlers/getPublicTestimonials");
const getPublicTestimonial_1 = require("./handlers/getPublicTestimonial");
const getMyTestimonials_1 = require("./handlers/getMyTestimonials");
const update_1 = require("./handlers/update");
const delete_1 = require("./handlers/delete");
const getPendingTestimonials_1 = require("./handlers/getPendingTestimonials");
const approve_1 = require("./handlers/approve");
const reject_1 = require("./handlers/reject");
class TestimonialController {
    async create(req, res) {
        return (0, create_1.create)(req, res);
    }
    async getPublicTestimonials(req, res) {
        return (0, getPublicTestimonials_1.getPublicTestimonials)(req, res);
    }
    async getPublicTestimonial(req, res) {
        return (0, getPublicTestimonial_1.getPublicTestimonial)(req, res);
    }
    async getMyTestimonials(req, res) {
        return (0, getMyTestimonials_1.getMyTestimonials)(req, res);
    }
    async update(req, res) {
        return (0, update_1.update)(req, res);
    }
    async delete(req, res) {
        return (0, delete_1.deleteTestimonial)(req, res);
    }
    async getPendingTestimonials(req, res) {
        return (0, getPendingTestimonials_1.getPendingTestimonials)(req, res);
    }
    async approve(req, res) {
        return (0, approve_1.approve)(req, res);
    }
    async reject(req, res) {
        return (0, reject_1.reject)(req, res);
    }
}
exports.TestimonialController = TestimonialController;
