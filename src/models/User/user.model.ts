import { users } from './user';
import { sequelize } from '../../middleware/dbConnector';

export const User = sequelize.define('users', users, {
  timestamps: false,
});

// User.sync();
