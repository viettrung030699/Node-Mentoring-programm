import { Op } from 'sequelize';

import { UserInterface } from '../interfaces';
import { User as UserModel } from '../models';

export const User = {
  getUserById: async (id: string) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    return user;
  },
  getUserByLogin: async (login: string) => {
    const user = await UserModel.findOne({
      where: {
        login: login,
      },
    });
    if (user === null) {
      return false;
    }

    return user;
  },
  getAllUsers: async () => {
    const users = await UserModel.findAll();
    return users;
  },
  createUser: async (user: UserInterface) => {
    const newUser = await UserModel.create(user);
    return newUser;
  },
  updateUser: async (user: UserInterface) => {
    const { id, login, password, age, isDeleted } = user;

    const updatedUser = await UserModel.update(
      { login, password, age, isDeleted },
      { where: { id: id } },
    );

    return updatedUser;
  },
  deleteUser: async (id: string) => {
    const targetUser = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (!targetUser) throw new Error(`User ${id} does not exist`);

    await UserModel.destroy({
      where: { id: id, isDeleted: false },
    });

    return targetUser.isDeleted;
  },
  filterUsers: async (loginSubstring: string, limit: number) => {
    const filteredUsers = await UserModel.findAll({
      limit,
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
    });
    return filteredUsers;
  },
};
