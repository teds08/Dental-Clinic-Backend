"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCouponConflict = void 0;
const index_1 = require("../../../repositories/appointment/index");
const checkCouponConflict = async (client, appointmentId, patientCouponId) => {
    if (patientCouponId === null || patientCouponId === undefined) {
        return null; // No coupon, no conflict
    }
    const statusRepo = new index_1.UpdateAppointmentStatusRepository(client);
    const conflictingAppointment = await statusRepo.findCouponConflict(appointmentId, patientCouponId);
    if (conflictingAppointment) {
        throw new Error(`Coupon conflict detected. ` +
            `The patient coupon used by this appointment ` +
            `is already assigned to appointment ID ` +
            `${conflictingAppointment.id} ` +
            `with status ${conflictingAppointment.status}. ` +
            `Please resolve the conflicting appointment before approving this appointment.`);
    }
    return null;
};
exports.checkCouponConflict = checkCouponConflict;
