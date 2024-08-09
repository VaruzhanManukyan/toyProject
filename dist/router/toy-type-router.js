"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("../controllers/supplier-controller"));
const router = (0, express_1.Router)();
router.post("/:supplierId/create", supplier_controller_1.default.create);
router.post("/:supplierId/read", supplier_controller_1.default.getById);
router.post("/:supplierId/read/:id", supplier_controller_1.default.getById);
router.post("/:supplierId/update/:id", supplier_controller_1.default.update);
router.post("/:supplierId/delete/:id", supplier_controller_1.default.remove);
exports.default = router;
