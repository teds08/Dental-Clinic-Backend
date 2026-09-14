"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    const user = req.user;
    if (!user || user.role_id !== 1) {
        return res.status(403).json({
            message: "Admin access only"
        });
    }
    next();
};
exports.adminOnly = adminOnly;
