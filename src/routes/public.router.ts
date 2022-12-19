import { authorize, login, signToken } from '../middlewares/auth';

const express = require('express');
export const publicRouter = express.Router();

publicRouter.post('/login', authorize, login, signToken);
