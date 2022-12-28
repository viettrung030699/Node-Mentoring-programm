import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { UserService } from '../services';
import { ERROR_400_MESSAGE, ERROR_400_USER_NOT_FOUND } from '../constants';

export const UserController = {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error(ERROR_400_MESSAGE);
      const user = await UserService.getUserById(id);
      if (!user) throw new Error(ERROR_400_USER_NOT_FOUND);
      res
        .status(StatusCodes.OK)
        .json({ user, msg: 'Successfully retrieved user' });
    } catch (error: any) {
      next(error);
    }
  },
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();

      res
        .status(StatusCodes.OK)
        .json({ users, msg: 'Successfully retrieved all users' });
    } catch (error: any) {
      next(error);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.body;
      const newUser = await UserService.createUser(userInfo);
      res
        .status(StatusCodes.OK)
        .json({ newUser, msg: 'Successfully created new user' });
    } catch (error: any) {
      next(error);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userInfo = req.body;

      const updatedUser = await UserService.updateUser(id, userInfo);
      res
        .status(StatusCodes.OK)
        .send({ msg: 'Successfully updated user', updatedUser });
    } catch (error: any) {
      next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const success = await UserService.deleteUser(id);
      res.status(StatusCodes.OK).send({ msg: 'Successfully deleted user' });
    } catch (error: any) {
      next(error);
    }
  },
  getSuggestUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filteredUsers = UserService.filterUsers(req.query);

      return res.status(StatusCodes.OK).send({ suggestUsers: filteredUsers });
    } catch (error: any) {
      next(error);
    }
    return res.status(StatusCodes.BAD_REQUEST).send(ERROR_400_MESSAGE);
  },
};
