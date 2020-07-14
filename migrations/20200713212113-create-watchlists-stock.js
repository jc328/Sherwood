'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Watchlists_Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_watchlist_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'User_Watchlists' }
      },
      stock_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Stocks' }
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
    return queryInterface.dropTable('Watchlists_Stocks');
  }
};
