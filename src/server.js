import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// --- AÑADE ESTO: Servir archivos estáticos ---
// Si tus archivos (index.html, app.js, style.css) están en una carpeta llamada 'public'
// Ajusta 'public' al nombre de tu carpeta donde está el HTML.
app.use(express.static(path.join(__dirname, '../public'))); 

// Ruta API (la que usa tu fetch)
app.post('/api/chat', async (req, res) => {
    // Aquí va toda tu lógica de Gemini que ya tenías
    // ...
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});