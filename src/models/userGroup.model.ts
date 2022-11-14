import { DataTypes } from 'sequelize';
import { sequelize } from '../middleware/dbConnector';
import { Group } from './Group/group.model';
import { User } from './User/user.model';

export const UserGroup = sequelize.define('userGroup', {
  UserId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    },
  },
  GroupId: {
    type: DataTypes.STRING,
    references: {
      model: Group,
      key: 'id',
    },
  },
}, {
  timestamps: false
});

sequelize.sync(); 