"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const create_1 = require("./handlers/create");
const getAllAppointments_1 = require("./handlers/getAllAppointments");
const approveAppointment_1 = require("./handlers/approveAppointment");
const rejectAppointment_1 = require("./handlers/rejectAppointment");
const getMyAppointments_1 = require("./handlers/getMyAppointments");
const getAppointmentDetails_1 = require("./handlers/getAppointmentDetails");
const cancelAppointment_1 = require("./handlers/cancelAppointment");
const completeAppointment_1 = require("./handlers/completeAppointment");
class AppointmentController {
    async create(req, res) {
        return (0, create_1.create)(req, res);
    }
    async getAllAppointments(req, res) {
        return (0, getAllAppointments_1.getAllAppointments)(req, res);
    }
    async approveAppointment(req, res) {
        return (0, approveAppointment_1.approveAppointment)(req, res);
    }
    async rejectAppointment(req, res) {
        return (0, rejectAppointment_1.rejectAppointment)(req, res);
    }
    async getMyAppointments(req, res) {
        return (0, getMyAppointments_1.getMyAppointments)(req, res);
    }
    async getAppointmentDetails(req, res) {
        return (0, getAppointmentDetails_1.getAppointmentDetails)(req, res);
    }
    async cancelAppointment(req, res) {
        return (0, cancelAppointment_1.cancelAppointment)(req, res);
    }
    async completeAppointment(req, res) {
        return (0, completeAppointment_1.completeAppointment)(req, res);
    }
}
exports.AppointmentController = AppointmentController;
