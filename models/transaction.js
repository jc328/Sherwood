'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    price: DataTypes.NUMERIC,
    share_quantity: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};