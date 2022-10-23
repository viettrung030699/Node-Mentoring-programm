import { Request, Response } from 'express';
import { string } from 'joi';
import { User } from '../models';

const users: User[] = [
  { id: '1', login: 'user_1', password: 'user123', age: 19, isDeleted: false },
  { id: '2', login: 'user_2', password: 'user123', age: 18, isDeleted: false },
  { id: '3', login: 'user_3', password: 'user123', age: 22, isDeleted: false },
  { id: '4', login: 'user_4', password: 'user123', age: 23, isDeleted: false },
];

const getAutoSuggestUsers= (substring: string, limit: number): User[] => {
  console.log({suggestUsers: users});
  return users;
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await users.find((user) => user.id === req.params.id);

  if (!user) {
    res.status(400).json({ 404: Error });
  }

  res.status(200).json({ user: user });
};

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({ users: users });
};

export const createUser = (req: Request, res: Response) => {
  const _id = req.body.id;
  if (!_id) {
    res.status(400).send({ message: 'Not valid' });
  }
  const newUser = { ...req.body };
  users.push(newUser);
  res.status(200).json({ user: users });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ message: 'Not Valid' });
  }

  const targetIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (targetIndex === -1) {
    res.status(400).send({ message: `Invalid userId ${id}` });
  }

  users[targetIndex] = req.body;

  res
    .status(200)
    .json({ user: users, message: `Update successed user: ${id}` });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    res.status(400).send({ message: 'Not Valid' });
  }

  const targetIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (targetIndex === -1) {
    res.status(400).send({ message: `Invalid userId ${id}` });
  }

  users[targetIndex].isDeleted = true;
  
  res.status(200).send({users: users, message: `User ${id} changed`});
};

export const getSuggestUsers = (req: Request, res: Response) => {
  const LIMIT_USERS = 5;
  const { substring } = req.params;
  console.log(req);
  
  const suggestUsers = getAutoSuggestUsers(substring, LIMIT_USERS);

  res.status(200).send({suggestUsers: suggestUsers, message: `Suggest Users test subString: ${substring}`})
}