import { login, signToken } from '../middlewares/auth';

const express = require('express');
export const publicRouter = express.Router();

publicRouter.post('/login', login, signToken);
