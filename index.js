// index.js - servidor com IA real no Render
const express = require('express');
const app = express();
app.use(express.json());

// GROQ API KEY - PEGA NO SITE groq.com (grátis, cadastre)
const GROQ_API_KEY = 'gsk_...'; // <-- coloca tua chave aqui

app.post('/alterar', async (req, res) => {
  const { comando } = req.body; // ex: "logo com maluco"

  const prompt = `Analisa esse comando: "${comando}".  
  Gere uma alteração HTML/CSS/JS simples para injetar no DOM.  
  Retorne um objeto JSON: { action: "style|add|text|hide", element: "body|header|logo", value: "valor" }  
  Ex: { "action": "style", "element": "body", "value": "background: red" }  
  Ou { "action": "add", "element": "body", "value": "<img src='gato.png' style='position:fixed;bottom:0;left:0;width:100px'>" }`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5
    })
  });

  const data = await response.json();
  const json = JSON.parse(data.choices[0].message.content); // IA devolve JSON

  res.json({ sucesso: true, alterar: json });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor no ar');
});
