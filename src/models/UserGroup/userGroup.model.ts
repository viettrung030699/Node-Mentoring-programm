import { sequelize } from '../../middleware/dbConnector';
import { userGroup } from './userGroup';

export const UserGroup = sequelize.define('userGroup', userGroup, {
  timestamps: false,
  initialAutoIncrement: 0
});
