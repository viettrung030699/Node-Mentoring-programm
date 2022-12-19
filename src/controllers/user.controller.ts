import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import {
  ERROR_400_MESSAGE,
  ERROR_400_USER_DELETED_FAILED,
  ERROR_400_USER_NOT_FOUND,
  ERROR_400_USER_UPDATED_FAILED,
  OK_200_UPDATE,
} from '../constants';
import { UserService } from '../services';

export const UserController = {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error(ERROR_400_USER_NOT_FOUND);
      const user = await UserService.getUserById(id);
      if (!user) throw new Error(ERROR_400_USER_NOT_FOUND);
      res.status(StatusCodes.OK).json(user);
    } catch (error: any) {
      next(error);
    }
  },
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      next(error);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.body;
      const newUser = await UserService.createUser(userInfo);
      res.status(StatusCodes.OK).json(newUser);
    } catch (error: any) {
      next(error);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userInfo = req.body;

      await UserService.updateUser(id, userInfo)
        .then((success: number) => {
          return success
            ? res.status(StatusCodes.OK).send({ message: OK_200_UPDATE })
            : res
                .status(StatusCodes.BAD_REQUEST)
                .send({
                  error: success,
                  Message: ERROR_400_USER_UPDATED_FAILED,
                });
        })
        .catch((error: any) => {
          throw new Error(ERROR_400_USER_NOT_FOUND);
        });
    } catch (error: any) {
      next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const success = await UserService.deleteUser(id);
      return success
        ? res.status(StatusCodes.OK).send({ message: OK_200_UPDATE })
        : res
            .status(StatusCodes.BAD_REQUEST)
            .send({ error: success, Message: ERROR_400_USER_DELETED_FAILED });
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

// export const getSuggestUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     let { loginSubstring = '', limit = 4 } = req.query;

//     const users: string = await User.findAll({
//       limit,
//       where: {
//         login: {
//           [Op.substring]: loginSubstring,
//         },
//       },
//     })
//       .then((res: JSON) => JSON.stringify(res, null, 2))
//       .catch((err: any) => console.error('Unable to get User', err));

//     const suggestUsers: UserInterface[] = JSON.parse(users)
//       .filter(
//         (user: UserInterface) =>
//           user.login.includes(loginSubstring.toString()) && !user.isDeleted,
//       )
//       .sort((user1: UserInterface, user2: UserInterface) =>
//         user1.login.localeCompare(user2.login),
//       )
//       .slice(0, +limit);

//     return res.status(StatusCodes.OK).send({ suggestUsers: suggestUsers });
//   } catch (error: any) {
//     next(error);
//   }
// };
