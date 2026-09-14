"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSufficientPoints = void 0;
const checkSufficientPoints = (currentBalance, requiredPoints) => {
    if (currentBalance < requiredPoints) {
        throw new Error("You do not have enough reward points.");
    }
};
exports.checkSufficientPoints = checkSufficientPoints;
