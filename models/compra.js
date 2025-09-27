'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      this.belongsTo(models.Item, {
        foreignKey: 'item_id',
        as: 'item',
      });
    }
  }
  Compra.init({
    comprador_github_login: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compras'
  });
  return Compra;
};