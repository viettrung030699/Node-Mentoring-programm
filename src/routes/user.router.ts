import { userSchema, validateSchema } from '../validation';
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSuggestUsers,
} from '../controllers';

const express = require('express');
export const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/', getSuggestUsers);

userRouter.get('/all', getAllUsers);

userRouter.post('/', validateSchema(userSchema), createUser);
userRouter.put('/:id', validateSchema(userSchema), updateUser);
userRouter.delete('/:id', deleteUser);
