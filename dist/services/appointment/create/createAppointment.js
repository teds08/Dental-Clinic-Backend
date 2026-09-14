"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const index_1 = require("../../../repositories/appointment/index");
const createAppointment = async (client, data, userId, amounts) => {
    const appointmentRepo = new index_1.CreateAppointmentRepository(client);
    const appointment = await appointmentRepo.create({
        ...data,
        user_id: userId,
        doctor_notes: data.doctor_notes ?? null,
        patient_coupon_id: data.patient_coupon_id ?? null,
        coupon_id: data.coupon_id ?? null,
        original_amount: amounts.originalAmount,
        discount_amount: amounts.discountAmount,
        final_amount: amounts.finalAmount,
        points_earned: amounts.pointsEarned,
    });
    return appointment;
};
exports.createAppointment = createAppointment;
