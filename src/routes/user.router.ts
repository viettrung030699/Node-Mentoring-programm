import { userSchema, validateSchema } from '../middleware';
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSuggestUsers,
} from '../controllers';

const express = require('express');
export const router = express.Router();

router.get('/:id', getUserById);
router.get('', getSuggestUsers);

router.get('/all', getAllUsers);

router.post('', validateSchema(userSchema), createUser);
router.put('/:id', validateSchema(userSchema), updateUser);
router.delete('/:id', deleteUser);
