import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response } from 'express';

import { User } from '../models';

const users: User[] = [
  { id: '1', login: 'user1', password: 'user123', age: 19, isDeleted: false },
  { id: '3', login: 'user3', password: 'user123', age: 22, isDeleted: false },
  { id: '2', login: 'user2', password: 'user123', age: 18, isDeleted: false },
  { id: '4', login: 'user4', password: 'user123', age: 23, isDeleted: false },
  { id: '5', login: 'trung', password: 'user123', age: 23, isDeleted: true },
];

const findUserIndexByID = (id: string) => {
  return users.findIndex((user) => {
    return user.id === id;
  });
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).send(user);
};

export const getAllUsers = (req: Request, res: Response) => {
  if (!users) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ users: users });
};

export const createUser = (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
  const newUser = { ...req.body };
  users.push(newUser);
  res.status(StatusCodes.OK).send({ message: 'Create Successed' });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = findUserIndexByID(id);

  if (userIndex === -1) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  users[userIndex] = req.body;

  res
    .status(StatusCodes.OK)
    .json({ user: users, message: `Update successed user: ${id}` });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = findUserIndexByID(id);

  if (userIndex === -1) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Invalid userId ${id}` });
  }

  users[userIndex].isDeleted !== true
    ? (users[userIndex].isDeleted = true)
    : res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `Deleted userId ${id}` });

  res
    .status(StatusCodes.OK)
    .send({ users: users[userIndex], message: `User ${id} is deleted` });
};

export const getSuggestUsers = (req: Request, res: Response) => {
  let { loginSubstring = '', limit = 4 } = req.query;

  const list = users
    .filter((user) => {
      return user.login.includes(loginSubstring.toString()) && !user.isDeleted;
    })
    .sort((user1, user2) => user1.login.localeCompare(user2.login))
    .slice(0, +limit);

  res.status(StatusCodes.OK).send({ list });
};
