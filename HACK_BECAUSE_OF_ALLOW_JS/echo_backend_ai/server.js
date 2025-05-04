// server.js - Backend limpio para ECHO en Render con CORS habilitado
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.post('/api/chat', async (req, res) => {
    try {
        const { mensaje } = req.body;
        console.log('🟢 Mensaje recibido:', mensaje);
        // Simulación de respuesta IA (modo demo)
        const respuesta = `Qué lindo recuerdo: "${mensaje}". ¿Querés contarme más?`;
        res.json({ respuesta });
    }
    catch (error) {
        console.error('Error en el backend:', error);
        res.status(500).json({ error: 'Ocurrió un error procesando tu mensaje.' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🧠 ECHO backend corriendo en el puerto ${PORT}`);
});
