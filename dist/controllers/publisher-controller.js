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
const publisher_service_1 = __importDefault(require("../services/publisher-service"));
class PublisherController {
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publisher = {
                    scenario_ids: [],
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password,
                    phone: request.body.phone
                };
                const publisherSave = yield publisher_service_1.default.create(publisher);
                response.status(201).json(publisherSave);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publisher = yield publisher_service_1.default.getAll();
                response.status(200).json(publisher);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publisher = yield publisher_service_1.default.getById(request.params.id);
                return response.status(200).json(publisher);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publisherUpdated = {
                    scenario_ids: [],
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password,
                    phone: request.body.phone
                };
                const publisherSave = yield publisher_service_1.default.update(request.params.id, publisherUpdated);
                response.status(200).json(publisherSave);
            }
            catch (error) {
                next(error);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield publisher_service_1.default.remove(request.params.id);
                response.status(200).json({ message });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new PublisherController();
