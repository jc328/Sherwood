'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      salt: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      session_token: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      account_balance: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
