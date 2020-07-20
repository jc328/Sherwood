'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      { price: 381, share_quantity: 208, stock_id: 2341, user_id: 1, createdAt: new Date(), updatedAt: new Date()},
      { price: 6, share_quantity: 10, stock_id: 249, user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      { price: 6.70, share_quantity: 5, stock_id: 3174, user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      { price: 4.97, share_quantity: 11, stock_id: 1096, user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      { price: 4.97, share_quantity: -5, stock_id: 1096, user_id: 2, createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions');
  }
};
