"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("./passport"));
const api_error_1 = __importDefault(require("../exeptions/api-error"));
const authMiddleware = (request, response, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (error, user) => {
        console.log(user);
        if (error) {
            return next(error);
        }
        if (!user) {
            return next(api_error_1.default.UnauthorizedError());
        }
        request.user = user;
        next();
    })(request, response, next);
};
exports.default = authMiddleware;
