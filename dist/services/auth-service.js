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
const argon2_1 = __importDefault(require("argon2"));
const auth_model_1 = __importDefault(require("../models/auth-model"));
const supplier_model_1 = __importDefault(require("../models/supplier-model"));
const publisher_model_1 = __importDefault(require("../models/publisher-model"));
const api_error_1 = __importDefault(require("../exeptions/api-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_enum_1 = require("../shared/enums/role-enum");
class AuthService {
    registration(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = (yield auth_model_1.default.findOne({ email })) ||
                (yield publisher_model_1.default.findOne({ email })) ||
                (yield supplier_model_1.default.findOne({ email }));
            if (candidate) {
                throw api_error_1.default.BadRequest(`A user with this email address ${email} already exists`);
            }
            const hashPassword = yield argon2_1.default.hash(password);
            const userDB = new auth_model_1.default({
                device_ids: [],
                scenario_ids: [],
                email,
                password: hashPassword,
                role
            });
            userDB.save();
            return userDB;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield auth_model_1.default.findOne({ email });
            if (!user) {
                user = yield publisher_model_1.default.findOne({ email });
                if (!user) {
                    user = yield supplier_model_1.default.findOne({ email });
                    if (!user) {
                        throw api_error_1.default.UnauthorizedError();
                    }
                    user.role = role_enum_1.Roles.SUPPLIER;
                }
                user.role = role_enum_1.Roles.PUBLISHER;
            }
            const isPasswordValid = yield argon2_1.default.verify(user.password, password);
            if (!isPasswordValid) {
                throw api_error_1.default.UnauthorizedError();
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: "1h" });
            return { token };
        });
    }
}
exports.default = new AuthService();
