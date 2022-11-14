import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup,
} from '../controllers/group.controller';

const express = require('express');

export const groupRouter = express.Router();

groupRouter.get('/:id', getGroupById);

groupRouter.get('', getAllGroups);

groupRouter.post('', createGroup);

groupRouter.post('/addUsersToGroup', addUsersToGroup);

groupRouter.put('/:id', updateGroupById);

groupRouter.delete('/:id', deleteGroupById);
