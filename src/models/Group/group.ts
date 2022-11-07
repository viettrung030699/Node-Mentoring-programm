const Sequelize = require('sequelize');

enum PERMISSION {
  READ = 1,
  WRITE,
  DELETE,
  SHARE,
  UPLOAD_FILES,
}

export const groups = {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  permission: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
    ),
  },
};
