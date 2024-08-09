"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier-controller"));
const role_middleware_1 = __importDefault(require("../middlewares/role-middleware"));
const role_enum_1 = require("../shared/enums/role-enum");
const router = (0, express_1.Router)();
router.post("/create", (0, role_middleware_1.default)([role_enum_1.Roles.SUPER_ADMIN]), supplier_controller_1.default.create);
router.post("/read", (0, role_middleware_1.default)([role_enum_1.Roles.SUPER_ADMIN]), supplier_controller_1.default.getAll);
router.post("/read/:id", (0, role_middleware_1.default)([role_enum_1.Roles.SUPER_ADMIN]), supplier_controller_1.default.getById);
router.post("/update/:id", (0, role_middleware_1.default)([role_enum_1.Roles.SUPER_ADMIN]), supplier_controller_1.default.update);
router.post("/delete/:id", (0, role_middleware_1.default)([role_enum_1.Roles.SUPER_ADMIN]), supplier_controller_1.default.remove);
exports.default = router;
