import { users } from './user';
import { sequelize } from '../../connection/dbConnector';

export const User = sequelize.define('users', users, {
  timestamps: false,
});

