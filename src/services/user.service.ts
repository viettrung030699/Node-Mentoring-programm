import { User as UserAccessLayer } from '../DAO/User';
import { UserInterface } from '../interfaces';
import { v4 } from 'uuid';
import { encryptPassword, verifyPassword } from '../utils/utils';
import { ERROR_400_MESSAGE, ERROR_400_USER_EXISTED, ERROR_400_USER_NOT_FOUND } from '../constants';

export const UserService = {
  getUserById: (id: string) => {
    const user = UserAccessLayer.getUserById(id);

    return user;
  },
  getAllUsers: () => {
    const users = UserAccessLayer.getAllUsers();

    return users;
  },
  createUser: async (user: UserInterface) => {
    const { login, password, age } = user;
    const existedUser = await UserAccessLayer.getUserByLogin(login);

    if (existedUser) throw new Error(ERROR_400_USER_EXISTED);

    const hashedPassword = encryptPassword(password);
    const newUser = {
      id: v4(),
      login: login,
      password: hashedPassword,
      age: age,
      isDeleted: false,
    };
    const createdUser = await UserAccessLayer.createUser(newUser);

    return createdUser;
  },
  updateUser: async (id: string, user: UserInterface) => {
    const targetUser = await UserAccessLayer.getUserById(id);

    if (!targetUser) throw new Error(ERROR_400_USER_NOT_FOUND);

    const updatedUser = await UserAccessLayer.updateUser(user);
    return updatedUser;
  },
  deleteUser: async (id: string) => {
    const isDeleted = await UserAccessLayer.deleteUser(id);
    return isDeleted;
  },
  filterUsers: async ({ loginSubstring = '', limit = 4 }) => {
    const users = await UserAccessLayer.filterUsers(loginSubstring, limit);
    users
      .then((res: JSON) => {
        console.log(res);
        JSON.stringify(res, null, 2);
      })
      .catch((err: any) => {
        throw new Error(ERROR_400_MESSAGE);
      });

    return users;
  },
  authorization: async (login: string, password: string) => {
    const existedUser = await UserAccessLayer.getUserByLogin(login);
    if (!existedUser) throw new Error(ERROR_400_USER_NOT_FOUND);
    const encryptPassword = existedUser.password;
    const verifiedPassword = verifyPassword(password, encryptPassword);
    if (!verifiedPassword) throw new Error(ERROR_400_MESSAGE);
    return existedUser;
  },
};
