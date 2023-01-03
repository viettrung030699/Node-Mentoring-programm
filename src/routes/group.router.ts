import {
  groupSchema,
  userGroupSchema,
  validateSchema,
} from '../validations/validation';
import { GroupController } from '../controllers';

const express = require('express');

export const groupRouter = express.Router();

groupRouter.get('/getAllGroups', GroupController.getAllGroups);

groupRouter.get('/:id', GroupController.getGroupById);

groupRouter.post('/create', validateSchema(groupSchema), GroupController.createGroup);

groupRouter.put('/:id', validateSchema(groupSchema), GroupController.updateGroupById);

groupRouter.post(
  '/addUsersToGroup',
  validateSchema(userGroupSchema),
  GroupController.addUsersToGroup,
);

groupRouter.delete('/:id', GroupController.deleteGroupById);
