const { z } = require('zod');

const createItemSchema = z.object({
  body: z.object({
    nome: z.string({
      required_error: 'O nome é obrigatório.',
    }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),

    preco: z.number({
      required_error: 'O preço é obrigatório.',
    }).positive({ message: 'O preço deve ser um número positivo.' }),

    qtd_atual: z.number({
      required_error: 'A quantidade é obrigatória.',
    }).int().nonnegative({ message: 'A quantidade deve ser um número inteiro igual ou maior que zero.' })
  }),
});

module.exports = {
  createItemSchema
};