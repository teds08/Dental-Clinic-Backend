"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const index_1 = require("../../../services/appointment/index");
const appointment_validator_1 = require("../../../validators/appointment.validator");
const createAppointmentService = new index_1.CreateAppointmentService();
const create = async (req, res) => {
    try {
        const validated = appointment_validator_1.createAppointmentValidator.parse(req.body);
        const userId = req.user.id;
        const appointment = await createAppointmentService.createAppointment(validated, userId);
        return res.status(201).json({
            message: "Appointment created successfully.",
            data: appointment,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.create = create;
