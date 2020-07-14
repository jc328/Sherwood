'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlists_Stock = sequelize.define('Watchlists_Stock', {
    user_watchlist_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER
  }, {});
  Watchlists_Stock.associate = function(models) {

  };
  return Watchlists_Stock;
};
