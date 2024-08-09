"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth-service"));
const role_enum_1 = require("../shared/enums/role-enum");
const api_error_1 = __importDefault(require("../exeptions/api-error"));
class AuthController {
    registration(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = request.body;
                if (role === role_enum_1.Roles.SUPER_ADMIN || !Object.values(role_enum_1.Roles).includes(role)) {
                    return next(api_error_1.default.BadRequest(`User with role ${role} cannot be created`));
                }
                const userData = yield auth_service_1.default.registration(email, password, role);
                response.status(201).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                const userData = yield auth_service_1.default.login(email, password);
                response.setHeader("Authorization", `Bearer ${userData.token}`);
                response.status(200).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
