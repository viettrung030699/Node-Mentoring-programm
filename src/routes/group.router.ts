import { groupSchema, userGroupSchema, validateSchema } from '../validation/validation';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup,
} from '../controllers';

const express = require('express');

export const groupRouter = express.Router();

groupRouter.get('/:id', getGroupById);

groupRouter.get('/', getAllGroups);

groupRouter.post('/', validateSchema(groupSchema), createGroup);

groupRouter.put('/:id', validateSchema(groupSchema), updateGroupById);

groupRouter.post('/addUsersToGroup', validateSchema(userGroupSchema), addUsersToGroup);

groupRouter.delete('/:id', deleteGroupById);
