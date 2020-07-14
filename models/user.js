'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    session_token: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    account_balance: {
      type: DataTypes.NUMERIC(10,2),
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    let columnMapping = {
      through: 'Transactions',
      otherKey: 'stock_id',
      foreignKey: 'user_id'
    }

    User.belongsToMany(models.Stock, columnMapping);
    User.hasMany(models.User_Watchlist, { foreignKey: 'user_id'});
  };
  return User;
};
