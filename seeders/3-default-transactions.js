'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      { price: 207, share_quantity: 50, stock_id: 4, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 33.82, share_quantity: 80, stock_id: 6, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 525.20, share_quantity: 125, stock_id: 9, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 1497, share_quantity: 100, stock_id: 12, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 381, share_quantity: 208, stock_id: 1, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 6, share_quantity: 10, stock_id: 2, user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      { price: 6.70, share_quantity: 5, stock_id: 3, user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      { price: 4.97, share_quantity: 11, stock_id: 5, user_id: 2, createdAt: new Date(), updatedAt: new Date()}

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions');
  }
};
