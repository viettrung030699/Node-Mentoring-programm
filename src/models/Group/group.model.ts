import { sequelize } from '../../middleware/dbConnector';
import { groups } from './group';


export const Group = sequelize.define('group', groups, {
  timestamps: false,
});

Group.sync();