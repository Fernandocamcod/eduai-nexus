import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { iniciarSesionTutor } from './config/gemini.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuraciones de Middleware básicos y seguridad de red (CORS)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta POST para recibir y responder las preguntas del chat
app.post('/api/chat', async (req, res) => {
    const { mensaje, historial } = req.body;

    if (!mensaje) {
        return res.status(400).json({ error: 'El mensaje del estudiante es requerido.' });
    }

    try {
        // Inicializamos la sesión de Gemini pasándole el historial de la conversación
        const chat = await iniciarSesionTutor(historial);
        const resultado = await chat.sendMessage(mensaje);
        
        // Extracción correcta del texto generado por la IA
        const respuestaTexto = resultado.response.text(); 

        res.json({ respuesta: respuestaTexto });
    } catch (error) {
        console.error("Error en la comunicación con la API de Gemini:", error);
        res.status(500).json({ error: 'Error interno en el motor de IA.' });
    }
});

// Arrancar la escucha del servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor de EduAI Nexus corriendo en: http://localhost:${PORT}`);
});