'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Watchlists_Stocks', [
      { user_watchlist_id: 1, stock_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 1, stock_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 1, stock_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 1, stock_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 2, stock_id: 8, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 2, stock_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 2, stock_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 8, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { user_watchlist_id: 3, stock_id: 12, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Watchlists_Stocks');
  }
};
