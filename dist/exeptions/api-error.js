"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class ApiError extends mongoose_1.Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
}
exports.default = ApiError;
