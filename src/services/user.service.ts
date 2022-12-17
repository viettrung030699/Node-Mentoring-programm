import { User as UserAccessLayer } from "../database/User";
import { UserInterface } from "../interfaces";
import { v4 } from "uuid";
import { encryptPassword } from "../utils/utils";

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

    if (existedUser) throw new Error('400 in createUser Service');

    const hashedPassword = encryptPassword(password);
    const newUser = {
      id: v4(),
      login: login,
      password: hashedPassword,
      age: age,
      isDeleted: false
    }
    const createdUser = await UserAccessLayer.createUser(newUser);

    return createdUser;
  },
  updateUser: async (id: string, user: UserInterface) => {
    const updatedUser = await UserAccessLayer.updateUser(id, user);
    return updatedUser;
  },
  // deleteUser: async (params: type) => {
  //   return;
  // },
  // getSuggestUsers: async (params: type) => {
  //   return;
  // },
};
