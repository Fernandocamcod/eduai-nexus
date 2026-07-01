import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// IMPORTANTE: Asegúrate de tener importada tu lógica de Google Generative AI aquí
// import { GoogleGenerativeAI } from "@google/generative-ai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// 1. RUTA DE LA API (Debe ir ANTES de express.static)
app.post('/api/chat', async (req, res) => {
    try {
        const { mensaje, historial } = req.body;
        
        // Aquí debes incluir tu lógica para llamar a Gemini usando 'mensaje' e 'historial'
        // Ejemplo simplificado:
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // ... (tu código de respuesta de IA) ...
        
        // Respuesta de ejemplo para verificar que el servidor conecta:
        res.json({ respuesta: "Hola, soy tu Tutor Socrático en la nube. ¿En qué te ayudo?" });
        
    } catch (error) {
        console.error('Error en API:', error);
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }
});

// 2. SERVICIO DE ARCHIVOS ESTÁTICOS (Va al final)
// Esto tomará todo lo que esté en tu carpeta 'public' y lo mostrará al entrar a la URL
app.use(express.static(path.join(__dirname, '../public')));

// 3. CONFIGURACIÓN DEL PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});