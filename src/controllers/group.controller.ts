import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { GroupService } from '../services';

export const GroupController = {
  getGroupById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const group = await GroupService.getGroupById(id);
      res
        .status(StatusCodes.OK)
        .json({ group, msg: 'Successfully retrieved group' });
    } catch (error: any) {
      next(error);
    }
  },
  getAllGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await GroupService.getAllGroups();
      res
        .status(StatusCodes.OK)
        .json({ groups, msg: 'Successfully retrieved all groups' });
    } catch (error: any) {
      next(error);
    }
  },
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupInfo = req.body;
      const newGroup = await GroupService.createGroup(groupInfo);

      res.status(StatusCodes.OK).json({
        newGroup,
        msg: `Successfully created new group`,
      });
    } catch (error: any) {
      next(error);
    }
  },
  updateGroupById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const groupInfo = req.body;
      const updatedGroup = await GroupService.updateGroup(id, groupInfo);

      res
        .status(StatusCodes.OK)
        .send({ msg: 'Successfully updated group', updatedGroup });
    } catch (error: any) {
      next(error);
    }
  },
  deleteGroupById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await GroupService.deleteGroupById(id);
      
      res.status(StatusCodes.OK).send({ msg: 'Group deleted successfully' });
    } catch (error: any) {
      next(error);
    }
  },
  addUsersToGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userIds, groupId } = req.body;
      await GroupService.addUsersToGroup(userIds, groupId);

      res.status(StatusCodes.CREATED).send({
        msg: 'Successfully Added Users to Group',
      });
    } catch (error: any) {
      next(error);
    }
  },
};
