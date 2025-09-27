const { Item } = require('../../models');

const itemController = {
  create: async (req, res) => {
    try {
      const { nome, preco, qtd_atual } = req.body;

      const itemExistente = await Item.findOne({ where: { nome } });
      if (itemExistente) {
        return res.status(409).json({ error: 'Já existe um item com este nome.' });
      }

      const newItem = await Item.create({ nome, preco, qtd_atual });
      return res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o item.' });
    }
},

  getAll: async (req, res) => {
    try {
      const items = await Item.findAll();
      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar os itens.' });
    }
  }
};

module.exports = itemController;