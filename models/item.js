'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.hasMany(models.Compra, {
        foreignKey: 'item_id',
        as: 'compras',
      });
    }
  }
  Item.init({
    nome: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    qtd_atual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'itens'
  });
  return Item;
};