"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth-middleware"));
const auth_router_1 = __importDefault(require("./router/auth-router"));
const supplier_router_1 = __importDefault(require("./router/supplier-router"));
const publisher_router_1 = __importDefault(require("./router/publisher-router"));
const scenario_router_1 = __importDefault(require("./router/scenario-router"));
require("dotenv").config();
const PORT = process.env.PORT || "5000";
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
console.log(passport_1.default);
app.use(passport_1.default.initialize()); // Make sure this is called before routes
app.use(express_1.default.json());
app.use(error_middleware_1.default);
app.use("/api/auth", auth_router_1.default);
app.use("/api/supplier", auth_middleware_1.default, supplier_router_1.default);
app.use("/api/publisher", auth_middleware_1.default, publisher_router_1.default);
app.use("/api/scenario", auth_middleware_1.default, scenario_router_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Server is Fire at http://localhost:${PORT}`));
    }
    catch (error) {
        console.log(`There is an error on the server:\n ${error}`);
    }
});
startServer();
