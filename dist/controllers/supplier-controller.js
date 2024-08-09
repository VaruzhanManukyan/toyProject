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
const supplier_service_1 = __importDefault(require("../services/supplier-service"));
class SupplierController {
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplier = {
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password,
                    phone: request.body.phone
                };
                const supplierSave = yield supplier_service_1.default.create(supplier);
                response.status(201).json(supplierSave);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suppliers = yield supplier_service_1.default.getAll();
                response.status(200).json(suppliers);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplier = yield supplier_service_1.default.getById(request.params.id);
                return response.status(200).json(supplier);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierUpdated = {
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password,
                    phone: request.body.phone
                };
                const supplierSave = yield supplier_service_1.default.update(request.params.id, supplierUpdated);
                response.status(200).json(supplierSave);
            }
            catch (error) {
                next(error);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield supplier_service_1.default.remove(request.params.id);
                response.status(200).json({ message });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SupplierController();
