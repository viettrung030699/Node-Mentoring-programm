import { getUserById } from "../controllers";

const express = require('express');
export const router = express.Router();

router.get('/:id', getUserById);

