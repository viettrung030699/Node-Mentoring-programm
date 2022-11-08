import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
} from '../controllers/group.controller';

const express = require('express');

export const groupRouter = express.Router();

groupRouter.get('/:id', getGroupById);

groupRouter.get('', getAllGroups);

groupRouter.post('', createGroup);

groupRouter.put('/:id', updateGroupById);

groupRouter.delete('/:id', deleteGroupById);
