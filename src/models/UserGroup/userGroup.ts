import { Group } from "../Group/group.model";
import { User } from "../User/user.model";

const Sequelize = require('sequelize');

export const userGroup = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id'
    },
  },
  GroupId: {
    type: Sequelize.STRING,
    references: {
      model: Group,
      key: 'id',
    },
  },
};
