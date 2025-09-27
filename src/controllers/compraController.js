const { Compra, Item, sequelize } = require('../../models');
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com/users';

const compraController = {
  create: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { item_id } = req.body;
      if (!item_id) {
        return res.status(400).json({ error: 'O item_id é obrigatório.' });
      }

      const item = await Item.findByPk(item_id);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }
      if (item.qtd_atual <= 0) {
        return res.status(400).json({ error: 'Item fora de estoque.' });
      }

      const githubResponse = await axios.get(GITHUB_API_URL);
      const users = githubResponse.data;
      if (!users || users.length === 0) {
        throw new Error('Não foi possível obter usuários do GitHub.');
      }

      const randomUser = users[Math.floor(Math.random() * users.length)];
      const compradorLogin = randomUser.login;

      const novaCompra = await Compra.create({
        item_id: item.id,
        comprador_github_login: compradorLogin
      }, { transaction: t });

      await item.decrement('qtd_atual', { by: 1, transaction: t });

      await t.commit();

      return res.status(201).json(novaCompra);

    } catch (error) {
      await t.rollback();
      console.error(error);
      if (error.isAxiosError) {
        return res.status(502).json({ error: 'Erro ao se comunicar com a API do GitHub.' });
      }
      return res.status(500).json({ error: 'Erro ao processar a compra.' });
    }
  },

  getAll: async (req, res) => {
    try {
      const compras = await Compra.findAll({
        include: [{
          model: Item,
          as: 'item',
          attributes: ['nome', 'preco']
        }]
      });
      return res.status(200).json(compras);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar as compras.' });
    }
  }
};

module.exports = compraController;