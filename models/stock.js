'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Stock.associate = function(models) {
    let columnMapping = {
      through: 'Watchlists_Stocks',
      otherKey: 'user_watchlists_id',
      foreignKey: 'stock_id'
    }
    let columnMappingUser = {
      through: 'Transactions',
      otherKey: 'user_id',
      foreignKey: 'stock_id'
    }

    Stock.belongsToMany(models.User_Watchlist, columnMapping);
    Stock.belongsToMany(models.User, columnMappingUser)
  };
  return Stock;
};
