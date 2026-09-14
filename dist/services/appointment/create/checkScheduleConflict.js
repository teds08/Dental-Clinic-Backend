"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScheduleConflict = void 0;
const index_1 = require("../../../repositories/appointment/index");
const checkScheduleConflict = async (appointmentDate, appointmentTime, endTime) => {
    const overlapRepo = new index_1.CheckAppointmentOverlapRepository();
    const hasConflict = await overlapRepo.hasConflict(appointmentDate, appointmentTime, endTime);
    if (hasConflict) {
        throw new Error("The selected schedule is already occupied.");
    }
};
exports.checkScheduleConflict = checkScheduleConflict;
