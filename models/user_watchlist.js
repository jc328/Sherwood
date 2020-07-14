'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Watchlist = sequelize.define('User_Watchlist', {
    list_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  User_Watchlist.associate = function(models) {
    User_Watchlist.belongsTo(models.User, { foreignKey: 'user_id' });

    let columnMapping = {
      through: 'Watchlists_Stocks',
      otherKey: 'stock_id',
      foreignKey: 'user_watchlists_id'
    }

    User_Watchlist.belongstoMany(models.Stock, columnMapping)
  };
  return User_Watchlist;
};
