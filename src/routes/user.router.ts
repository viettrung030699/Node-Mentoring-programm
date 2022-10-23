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
router.get('', getAllUsers);
router.get('/', getSuggestUsers);

router.post('', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

