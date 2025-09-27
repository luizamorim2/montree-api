const fs = require('fs');
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const https = require('https');
const itemRoutes = require('./routes/itemRoutes');
const compraRoutes = require('./routes/compraRoutes');

if (process.env.NODE_ENV !== 'production' && fs.existsSync('./.env.local')) {
  console.log("INFO: A carregar variáveis do ficheiro .env.local");
  dotenv.config({ path: './.env.local' });
} else {
  console.log("INFO: A carregar variáveis do ficheiro .env padrão");
  dotenv.config();
}

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(express.json({ limit: "10mb" }));

app.get('/', (req, res) => {
  res.send('');
});

app.use('/itens', itemRoutes);
app.use('/compras', compraRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

app.use((req, err, res, next) => {
  console.error(`[ERROR] ${new Date().toLocaleString()}:`, err.stack);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'O corpo da requisição contém um JSON malformado.'
    });
  }

  res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

(async () => {
  try {
    if (isProduction) {
      if (!fs.existsSync("./certs/privkey.pem")) {
         throw new Error("Certificado de produção 'privkey.pem' não encontrado.");
      }
      const keyCert = fs.readFileSync("./certs/privkey.pem");
      const originCert = fs.readFileSync("./certs/origin.pem");
      const options = { key: keyCert, cert: originCert };
      const PORT = process.env.PORT || 3001;

      https.createServer(options, app).listen(PORT, () => {
        console.log(`✅ Servidor de PRODUÇÃO HTTPS rodando na porta ${PORT}`);
      });
    } else {
      const PORT = process.env.PORT || 3000;
      http.createServer(app).listen(PORT, () => {
        console.log(`🚀 Servidor de DESENVOLVIMENTO HTTP rodando em http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ FATAL: Falha ao iniciar o servidor.", error.message);
    process.exit(1);
  }
})();