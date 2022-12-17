import { sequelize } from '../../connection/dbConnector';
import { userGroup } from './userGroup';

export const UserGroup = sequelize.define('userGroup', userGroup, {
  timestamps: false,
  initialAutoIncrement: 0
});
