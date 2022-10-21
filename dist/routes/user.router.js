"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controllers_1 = require("../controllers");
const express = require('express');
exports.router = express.Router();
exports.router.get('/:id', controllers_1.getUserById);
