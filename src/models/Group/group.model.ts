import { sequelize } from '../../connection/dbConnector';
import { groups } from './group';

export const Group = sequelize.define('group', groups, {
  timestamps: false,
});
