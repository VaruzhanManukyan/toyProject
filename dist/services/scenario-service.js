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
const api_error_1 = __importDefault(require("../exeptions/api-error"));
const publisher_model_1 = __importDefault(require("../models/publisher-model"));
const scenario_model_1 = __importDefault(require("../models/scenario-model"));
class ScenarioService {
    create(name, publisherId) {
        return __awaiter(this, void 0, void 0, function* () {
            const scenario = new scenario_model_1.default({
                audio_file_ids: [],
                personage_obj_state_ids: [],
                name
            });
            const publisher = yield publisher_model_1.default.findById(publisherId);
            if (!publisher) {
                throw api_error_1.default.BadRequest(`Publisher with id ${publisherId} not found.`);
            }
            publisher.scenario_ids.push(scenario._id);
            yield scenario.save();
            yield publisher.save();
            return scenario;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const publishers = yield publisher_model_1.default.find();
            if (!publishers) {
                throw api_error_1.default.BadRequest(`Publishers not found.`);
            }
            return publishers;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const publisher = yield publisher_model_1.default.findById(id);
            if (!publisher) {
                throw api_error_1.default.BadRequest(`Publisher with id ${id} not found.`);
            }
            return publisher;
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const publisher = yield publisher_model_1.default.findOneAndUpdate({ _id: id }, { set: update }, { new: true });
            if (!publisher) {
                throw api_error_1.default.BadRequest(`Publishers not found.`);
            }
            return publisher;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const publisher = yield publisher_model_1.default.deleteOne({ _id: id });
            if (!publisher) {
                throw api_error_1.default.BadRequest(`Publisher with id ${id} not found.`);
            }
            return "Publisher is delete";
        });
    }
}
exports.default = new ScenarioService();
