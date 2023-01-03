import { GroupInterface, Permission, UserInterface } from '../interfaces';
import { Group as GroupModel, UserGroup as UserGroupModel } from '../models';

export const Group = {
  getGroupById: async (id: string) => {
    const group = await GroupModel.findOne({
      where: { id: id },
    });

    return group;
  },
  getAllGroups: async () => {
    const groups = await GroupModel.findAll();
    return groups;
  },
  createGroup: async (
    id: string,
    name: string,
    permissions: Array<Permission>,
  ) => {
    const newGroup = await GroupModel.create({
      id,
      name,
      permissions,
    });

    return newGroup;
  },
  updateGroup: async (group: GroupInterface) => {
    const { id, name, permissions } = group;
    const updatedGroup = await GroupModel.update(
      { name, permissions },
      { where: { id: id } },
    );

    return updatedGroup;
  },
  deleteGroup: async (id: string) => {
    await GroupModel.destroy({
      where: { id: id },
    });
  },
  addUsersToGroup: async (user: UserInterface, group: GroupInterface) => {
    await UserGroupModel.create({
      UserId: user.id,
      GroupId: group.id,
    });
  },
};
