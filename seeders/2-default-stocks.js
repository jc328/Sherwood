'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stocks', [
      { symbol: 'AAPL', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'F', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'GE', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'MSFT', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'GPRO', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'TWTR', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'SBUX', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'XOM', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'NFLX', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'NKE', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'WORK', createdAt: new Date(), updatedAt: new Date()},
      { symbol: 'TSLA', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stocks', null, {})
  }
}
