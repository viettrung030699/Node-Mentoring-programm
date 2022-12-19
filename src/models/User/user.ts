const Sequelize = require('sequelize');

export const users = {
  id: { type: Sequelize.STRING, primaryKey: true },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 30 },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 4, max: 130 },
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
};
