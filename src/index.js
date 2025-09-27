require('dotenv').config();

const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const compraRoutes = require('./routes/compraRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (res) => {
  res.send('');
});

app.use('/itens', itemRoutes);
app.use('/compras', compraRoutes);

app.use((res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

app.use((err, res) => {
  console.error(`[ERROR] ${new Date().toLocaleString()}:`, err.stack);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'O corpo da requisição contém um JSON malformado.'
    });
  }

  res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});