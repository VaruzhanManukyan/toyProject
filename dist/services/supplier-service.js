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
const supplier_model_1 = __importDefault(require("../models/supplier-model"));
const api_error_1 = __importDefault(require("../exeptions/api-error"));
class SupplierService {
    create(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone } = supplier;
            const candidateWithName = yield supplier_model_1.default.findOne({ name });
            if (candidateWithName) {
                throw api_error_1.default.BadRequest(`A supplier with this name ${name} already exists.`);
            }
            const candidateWithEmail = yield supplier_model_1.default.findOne({ email });
            if (candidateWithEmail) {
                throw api_error_1.default.BadRequest(`A supplier with this email address ${email} already exists`);
            }
            const candidateWithPhone = yield supplier_model_1.default.findOne({ phone });
            if (candidateWithPhone) {
                throw api_error_1.default.BadRequest(`A supplier with the same phone number ${phone} already exists.`);
            }
            const hashPassword = yield argon2_1.default.hash(supplier.password);
            const supplierDB = new supplier_model_1.default({
                name: supplier.name,
                email: supplier.email,
                password: hashPassword,
                phone: supplier.phone
            });
            yield supplierDB.save();
            return supplierDB;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const suppliers = yield supplier_model_1.default.find();
            return suppliers;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supplier_model_1.default.findById(id);
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_model_1.default.findOneAndUpdate({ _id: id }, { set: update }, { new: true });
            return supplier;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield supplier_model_1.default.deleteOne({ _id: id });
            return "Supplier is delete";
        });
    }
}
exports.default = new SupplierService();
