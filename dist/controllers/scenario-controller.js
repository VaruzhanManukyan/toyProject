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
const scenario_service_1 = __importDefault(require("../services/scenario-service"));
class ScenarioController {
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = request.body;
                const publisherId = request.params.publisherId;
                const scenario = yield scenario_service_1.default.create(name, publisherId);
                response.status(201).json(scenario);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return response.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ScenarioController();
