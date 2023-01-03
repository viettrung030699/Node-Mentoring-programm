import { Group as GroupAccessLayer } from '../DAO/Group';
import { User as UserAccessLayer } from '../DAO/User';

import {
  ERROR_400_GROUPS_NOT_FOUND,
  ERROR_400_GROUP_EXISTED,
  ERROR_400_GROUP_NOT_FOUND,
  ERROR_400_MESSAGE,
} from '../constants';
import { GroupInterface, UserInterface } from '../interfaces';

export const GroupService = {
  getGroupById: async (id: string) => {
    const group = await GroupAccessLayer.getGroupById(id);

    if (!group) throw new Error(ERROR_400_GROUP_NOT_FOUND);

    return group;
  },
  getAllGroups: async () => {
    const groups = await GroupAccessLayer.getAllGroups();

    if (!groups) throw new Error(ERROR_400_GROUPS_NOT_FOUND);

    return groups;
  },
  createGroup: async (group: GroupInterface) => {
    const { id, name, permissions } = group;
    const existedGroup = await GroupAccessLayer.getGroupById(id);

    if (existedGroup) throw new Error(ERROR_400_GROUP_EXISTED);

    const newGroup = await GroupAccessLayer.createGroup(id, name, permissions);

    return newGroup;
  },
  updateGroup: async (id: string, group: GroupInterface) => {
    const targetGroup = await GroupAccessLayer.getGroupById(id);

    if (!targetGroup) throw new Error(ERROR_400_GROUP_NOT_FOUND);

    const updatedGroup = await GroupAccessLayer.updateGroup(group);
    return updatedGroup;
  },
  deleteGroupById: async (id: string) => {
    const targetGroup = await GroupAccessLayer.getGroupById(id);

    if (!targetGroup) throw new Error(ERROR_400_GROUP_NOT_FOUND);
    
    const isDeleted = await GroupAccessLayer.deleteGroup(id);
    return isDeleted;
  },
  addUsersToGroup: async (userIds: any, groupId: string) => {
    const group = await GroupAccessLayer.getGroupById(groupId);
    const users = await UserAccessLayer.getUsersById(userIds);

    if (!group || !users) throw new Error(ERROR_400_MESSAGE);

    users.forEach(async (user: UserInterface) => {
      await GroupAccessLayer.addUsersToGroup(user, group);
    });
  },
};
