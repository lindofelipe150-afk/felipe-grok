const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota /chat que recebe o prompt e responde
app.post('/chat', (req, res) => {
  const { prompt } = req.body;
  console.log('Recebi prompt:', prompt);

  // Resposta mock simples (depois trocamos por IA real)
  const resposta = `Recebi seu prompt: "${prompt}". Tudo funcionando no seu servidor secreto! 😎`;

  res.json({ response: resposta });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
