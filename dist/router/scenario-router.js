"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scenario_controller_1 = __importDefault(require("../controllers/scenario-controller"));
const role_middleware_1 = __importDefault(require("../middlewares/role-middleware"));
const role_enum_1 = require("../shared/enums/role-enum");
const router = (0, express_1.Router)();
router.post("/:publisherId/create", (0, role_middleware_1.default)([role_enum_1.Roles.PUBLISHER]), scenario_controller_1.default.create);
exports.default = router;
