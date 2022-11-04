import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response } from 'express';

import { User } from '../models';
import { Op } from 'sequelize';

interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export const getUserById = async (req: Request, res: Response) => {
  console.log('Called GetUserbyID');

  try {
    const user: User = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).send(user);
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(StatusCodes.OK).send({ users: users });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, login, password, age, isDeleted } = req.body;

    const oldUser: User = await User.findOne({ where: { id } });

    if (oldUser) {
      res.status(StatusCodes.BAD_REQUEST).send('User Exist!');
    }

    const newUser: User = await User.create({
      id,
      login,
      password,
      age,
      isDeleted,
    });

    if (!newUser) {
      res.status(StatusCodes.BAD_REQUEST).send('Unable to create new User');
    }

    res.status(StatusCodes.OK).send({
      message: `Create Successed ${newUser.id} - ${newUser.login}`,
    });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { login, password, age, isDeleted } = req.body;

    await User.update(
      { login, password, age, isDeleted },
      { where: { id: id } },
    )
      .then((success: number) => {
        return success
          ? res
              .status(StatusCodes.OK)
              .send({ message: `User${id} updated successfully!` })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .send({ error: success, Message: ReasonPhrases.BAD_REQUEST });
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id, isDeleted: false } }).then(
      (success: number) => {
        return success
          ? res
              .status(StatusCodes.OK)
              .send({ message: `User${id} deleted successfully!` })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .send({ error: success, Message: ReasonPhrases.BAD_REQUEST });
      },
    );
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const getSuggestUsers = async (req: Request, res: Response) => {
  try {
    let { loginSubstring = '', limit = 4 } = req.query;

    const users: string = await User.findAll({
      limit,
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
    })
      .then((res: JSON) => JSON.stringify(res, null, 2))
      .catch((err: unknown) => console.error('Unable to get User', err));

    const suggestUsers: User[] = JSON.parse(users)
      .filter(
        (user: User) =>
          user.login.includes(loginSubstring.toString()) && !user.isDeleted,
      )
      .sort((user1: User, user2: User) =>
        user1.login.localeCompare(user2.login),
      )
      .slice(0, +limit);

    return res.status(StatusCodes.OK).send({ suggestUsers: suggestUsers });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};
