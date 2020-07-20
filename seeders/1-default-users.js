'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { email: 'demo@gmail.com', password:'$2b$10$8jOAZFLByJ7lFFqPekwfZ.7ZGBuJqpGpSK14JFTi8nKhZyjhiQkOu', salt: '$2b$10$8jOAZFLByJ7lFFqPekwfZ.', session_token: '38dpVwPOvlgF8PxhlEdIImxXhf3Xvfmo', account_balance: 1000000, createdAt: new Date(), updatedAt: new Date()},
      { email: 'test@gmail.com', password:'$2b$10$zvtnRGuSX85VE8U6OEi29.XBhN0AzJH46zXeBy7x8gbpvWHWLIN9u', salt: '2@$2b$10$zvtnRGuSX85VE8U6OEi29.', session_token: 'asdfoij23f', account_balance: 2.50, createdAt: new Date(), updatedAt: new Date()}

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
