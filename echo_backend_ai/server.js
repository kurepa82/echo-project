// server.js - Backend simulado para ECHO sin conexión a OpenAI

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: '*'
  }));  
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { mensaje } = req.body;
    console.log('🟢 Mensaje simulado recibido:', mensaje);

    // Respuesta de ejemplo (simulada)
    const respuesta = `Gracias por compartir eso. Me alegra que recuerdes: "${mensaje}". ¿Querés que lo recordemos juntos más adelante?`;

    res.json({ respuesta });
  } catch (error) {
    console.error('Error simulado:', error);
    res.status(500).json({ error: 'Error al procesar el mensaje simulado.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🧪 Servidor ECHO (modo demo) escuchando en http://localhost:${PORT}`);
});
