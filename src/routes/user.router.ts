import { UserController } from '../controllers';
import { errorHandler } from '../middlewares';
import { userSchema, validateSchema } from '../validations';

const express = require('express');
export const userRouter = express.Router();

userRouter.get('/getAllUsers', UserController.getAllUsers);

userRouter.get('/:id', UserController.getUserById);

userRouter.get('/filter', UserController.getSuggestUsers);


userRouter.post('/create', validateSchema(userSchema), UserController.createUser);
userRouter.put('/:id', validateSchema(userSchema), UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);
