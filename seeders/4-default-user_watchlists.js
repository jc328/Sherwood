'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_Watchlists', [
      { list_name: 'Demo Watchlist #1', user_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { list_name: 'Demo Watchlist #2', user_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { list_name: 'Cool Stocks', user_id: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Watchlists');
  }
};
