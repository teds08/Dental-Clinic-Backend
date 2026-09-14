"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEarnedPoints = void 0;
const calculateEarnedPoints = (appointment, balanceBefore) => {
    let earnedPoints = 0;
    // Determine earned points based on coupon usage
    if (appointment.patient_coupon_id === null && appointment.coupon_id === null) {
        // No coupon used - earn full points
        earnedPoints = appointment.points_earned;
    }
    else {
        // Coupon was used - no points earned
        earnedPoints = 0;
    }
    const balanceAfter = balanceBefore + earnedPoints;
    return { earnedPoints, balanceAfter };
};
exports.calculateEarnedPoints = calculateEarnedPoints;
