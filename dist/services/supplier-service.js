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
const supplier_model_1 = __importDefault(require("../models/supplier-model"));
const supplier_model_2 = __importDefault(require("../models/supplier-model"));
class SupplierService {
    create(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierDB = new supplier_model_1.default({
                name: supplier.name
            });
            supplierDB.save();
            return supplierDB;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supplier_model_1.default.findById(id);
        });
    }
    update(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_model_1.default.findOneAndUpdate({ set: update }, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield supplier_model_2.default.deleteOne({ _id: id });
            return "Category is delete";
        });
    }
}
exports.default = new SupplierService();
