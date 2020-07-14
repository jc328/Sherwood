'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { email: 'demo@gmail.com', password:'demo', salt: '2@giWSEOIHws', session_token: 'asdfoij234f', account_balance: 1000000, createdAt: new Date(), updatedAt: new Date()},
      { email: 'test@gmail.com', password:'test', salt: '2@235kjfa', session_token: 'asdfoij23f', account_balance: 2.50, createdAt: new Date(), updatedAt: new Date()}

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
