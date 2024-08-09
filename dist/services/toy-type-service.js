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
const toy_type_model_1 = __importDefault(require("../models/toy-type-model"));
class ToyTypeService {
    create(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierDB = new toy_type_model_1.default({
                name: supplier.name
            });
            yield supplierDB.save();
            return supplierDB;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toy_type_model_1.default.findById(id);
        });
    }
    update(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield toy_type_model_1.default.findOneAndUpdate({ set: update }, { new: true });
            return supplier;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield toy_type_model_1.default.deleteOne({ _id: id });
            return "Category is delete";
        });
    }
}
exports.default = new ToyTypeService();
