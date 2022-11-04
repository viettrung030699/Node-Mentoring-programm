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
    validate: {
      validatePassword: function (value: string) {
        if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value)) {
          throw new Error('Password does not meets the requirements');
        }
      },
    },
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
